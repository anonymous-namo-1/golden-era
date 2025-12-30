import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userId] = useState('guest');

  // Wrap fetch functions in useCallback with proper dependencies
  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get(`/cart?userId=${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart([]);
    }
  }, [userId]);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await api.get(`/wishlist?userId=${userId}`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setWishlist([]);
    }
  }, [userId]);

  // Fetch cart and wishlist on mount
  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  const addToCart = useCallback(async (productId, quantity = 1, size = null) => {
    try {
      await api.post(`/cart`, { productId, quantity, size, userId });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  }, [userId, fetchCart]);

  const updateCartItem = useCallback(async (itemId, quantity) => {
    try {
      await api.put(`/cart/${itemId}?quantity=${quantity}`);
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  }, [fetchCart]);

  const clearCart = useCallback(async () => {
    try {
      await api.delete(`/cart?userId=${userId}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }, [userId]);

  const addToWishlist = useCallback(async (productId) => {
    try {
      await api.post(`/wishlist`, { productId, userId });
      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  }, [userId, fetchWishlist]);

  const removeFromWishlist = useCallback(async (itemId) => {
    try {
      await api.delete(`/wishlist/${itemId}`);
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }, [fetchWishlist]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const value = {
    cart,
    wishlist,
    userId,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    fetchCart,
    fetchWishlist
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};