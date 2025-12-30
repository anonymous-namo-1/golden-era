import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [userId] = useState('guest');

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/cart?userId=${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API}/wishlist?userId=${userId}`);
      setWishlist(res.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToCart = async (productId, quantity = 1, size = null) => {
    try {
      await axios.post(`${API}/cart`, { productId, quantity, size, userId });
      await fetchCart();
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await axios.put(`${API}/cart/${itemId}?quantity=${quantity}`);
      await fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${API}/cart/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API}/cart?userId=${userId}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.post(`${API}/wishlist`, { productId, userId });
      await fetchWishlist();
      return true;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return false;
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.delete(`${API}/wishlist/${itemId}`);
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

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