import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Base delay in ms
const RETRY_STATUS_CODES = [408, 429, 500, 502, 503, 504];

// Exponential backoff delay
const getRetryDelay = (retryCount) => {
  return RETRY_DELAY * Math.pow(2, retryCount);
};

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Don't retry if no config or max retries exceeded
    if (!config || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    // Check if error is retryable
    const isRetryableError =
      !error.response ||
      RETRY_STATUS_CODES.includes(error.response?.status) ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_NETWORK';

    if (!isRetryableError) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config.__retryCount = config.__retryCount || 0;
    config.__retryCount += 1;

    // Calculate delay
    const delay = getRetryDelay(config.__retryCount);

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, delay));

    // Retry the request
    return apiClient(config);
  }
);

// API helper methods
const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};

// Error handler wrapper
export const handleApiError = (error, customMessage) => {
  const message =
    error.response?.data?.detail ||
    error.response?.data?.message ||
    error.message ||
    customMessage ||
    'An unexpected error occurred';

  console.error('API Error:', error);
  toast.error(message);

  return message;
};

// Wrapper functions with error handling
export const apiWithToast = {
  get: async (url, config) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  post: async (url, data, config, successMessage) => {
    try {
      const response = await api.post(url, data, config);
      if (successMessage) {
        toast.success(successMessage);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  put: async (url, data, config, successMessage) => {
    try {
      const response = await api.put(url, data, config);
      if (successMessage) {
        toast.success(successMessage);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  patch: async (url, data, config, successMessage) => {
    try {
      const response = await api.patch(url, data, config);
      if (successMessage) {
        toast.success(successMessage);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  delete: async (url, config, successMessage) => {
    try {
      const response = await api.delete(url, config);
      if (successMessage) {
        toast.success(successMessage);
      }
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};

export default api;
