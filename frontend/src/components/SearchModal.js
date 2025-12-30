import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, History } from 'lucide-react';
import api from '../services/api';
import { useToast } from '../hooks/use-toast';

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimer = useRef(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch suggestions with debouncing
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.get(`/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions(res.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search handler
  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer for 300ms debounce
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Save search to recent searches
  const saveRecentSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;

    const updated = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery)
    ].slice(0, 5); // Keep only 5 recent searches

    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }

    saveRecentSearch(searchQuery.trim());
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    onClose();
    setQuery('');
    setSuggestions([]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'product') {
      navigate(`/product/${suggestion.id}`);
      saveRecentSearch(suggestion.name);
    } else if (suggestion.type === 'category') {
      navigate(`/shop/${suggestion.slug}`);
      saveRecentSearch(suggestion.name);
    } else {
      handleSearch(suggestion.name);
    }
    onClose();
    setQuery('');
    setSuggestions([]);
  };

  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    setQuery(search);
    fetchSuggestions(search);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl z-10">
        {/* Search Input */}
        <div className="flex items-center border-b border-gray-200 p-4">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for jewelry, categories..."
            value={query}
            onChange={handleQueryChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 outline-none text-lg"
          />
          <button
            onClick={onClose}
            className="ml-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {/* Loading */}
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A961]"></div>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading && showSuggestions && suggestions.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-center text-left transition-colors"
                >
                  <TrendingUp className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{suggestion.name}</div>
                    {suggestion.category && (
                      <div className="text-sm text-gray-500">{suggestion.category}</div>
                    )}
                  </div>
                  {suggestion.type === 'product' && suggestion.price && (
                    <div className="text-[#C9A961] font-semibold">
                      ₹{suggestion.price.toLocaleString()}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && showSuggestions && suggestions.length === 0 && query.trim() && (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for "{query}"</p>
              <button
                onClick={() => handleSearch()}
                className="mt-4 text-[#C9A961] hover:text-[#B89647] font-medium"
              >
                Search anyway
              </button>
            </div>
          )}

          {/* Recent Searches */}
          {!showSuggestions && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-2 flex items-center justify-between">
                <div className="text-xs font-semibold text-gray-500 uppercase">
                  Recent Searches
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-[#C9A961] hover:text-[#B89647]"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-center text-left transition-colors"
                >
                  <History className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!showSuggestions && recentSearches.length === 0 && !query && (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Start typing to search for jewelry</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
