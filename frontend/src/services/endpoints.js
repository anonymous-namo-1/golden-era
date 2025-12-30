// API Endpoint Constants

// Authentication
export const AUTH_ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  REFRESH: '/auth/refresh',
};

// Products
export const PRODUCT_ENDPOINTS = {
  LIST: '/products',
  DETAIL: (id) => `/products/${id}`,
  SEARCH: '/search/suggestions',
};

// Cart
export const CART_ENDPOINTS = {
  GET: '/cart',
  ADD: '/cart',
  UPDATE: (itemId) => `/cart/${itemId}`,
  DELETE: (itemId) => `/cart/${itemId}`,
  CLEAR: '/cart/clear',
};

// Wishlist
export const WISHLIST_ENDPOINTS = {
  GET: '/wishlist',
  ADD: '/wishlist',
  DELETE: (itemId) => `/wishlist/${itemId}`,
};

// Orders
export const ORDER_ENDPOINTS = {
  CREATE: '/orders',
  LIST: '/orders',
  DETAIL: (id) => `/orders/${id}`,
};

// Stores
export const STORE_ENDPOINTS = {
  LIST: '/stores',
  DETAIL: (id) => `/stores/${id}`,
};

// Collections
export const COLLECTION_ENDPOINTS = {
  LIST: '/collections',
  DETAIL: (slug) => `/collections/${slug}`,
};

// Appointment
export const APPOINTMENT_ENDPOINTS = {
  CREATE: '/appointments',
  LIST: '/appointments',
};

// Contact
export const CONTACT_ENDPOINTS = {
  SUBMIT: '/contact',
};

// Gold Exchange
export const GOLD_EXCHANGE_ENDPOINTS = {
  SUBMIT: '/gold-exchange',
};

// Newsletter
export const NEWSLETTER_ENDPOINTS = {
  SUBSCRIBE: '/newsletter',
};

// Gold Rates
export const GOLD_RATE_ENDPOINTS = {
  GET: '/gold-rates',
};

// Guides
export const GUIDE_ENDPOINTS = {
  LIST: '/guides',
  DETAIL: (type) => `/guides/${type}`,
};

// Payment
export const PAYMENT_ENDPOINTS = {
  CREATE_ORDER: '/payment/razorpay/create',
  VERIFY: '/payment/razorpay/verify',
};

export default {
  AUTH_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  CART_ENDPOINTS,
  WISHLIST_ENDPOINTS,
  ORDER_ENDPOINTS,
  STORE_ENDPOINTS,
  COLLECTION_ENDPOINTS,
  APPOINTMENT_ENDPOINTS,
  CONTACT_ENDPOINTS,
  GOLD_EXCHANGE_ENDPOINTS,
  NEWSLETTER_ENDPOINTS,
  GOLD_RATE_ENDPOINTS,
  GUIDE_ENDPOINTS,
  PAYMENT_ENDPOINTS,
};
