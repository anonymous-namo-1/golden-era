import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useApp();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartProducts();
  }, [cart]);

  const fetchCartProducts = async () => {
    if (cart.length === 0) {
      setLoading(false);
      return;
    }
    try {
      const productIds = cart.map(item => item.productId);
      const promises = productIds.map(id => axios.get(`${API}/products/${id}`));
      const responses = await Promise.all(promises);
      const productsMap = {};
      responses.forEach(res => {
        productsMap[res.data.id] = res.data;
      });
      setProducts(productsMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart products:', error);
      setLoading(false);
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const product = products[item.productId];
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center" data-testid="empty-cart">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Discover our beautiful collection</p>
          <Link to="/shop" className="btn-gold px-6 py-3 text-white inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}} data-testid="cart-title">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => {
              const product = products[item.productId];
              if (!product) return null;
              
              return (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm flex gap-4" data-testid={`cart-item-${item.id}`}>
                  <img src={product.images[0]} alt={product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.metal} {product.purity}</p>
                    {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                    <p className="text-lg font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700" data-testid={`remove-item-${item.id}`}>
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <div className="flex items-center gap-2 border border-gray-300 rounded">
                      <button 
                        onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 hover:bg-gray-100"
                        data-testid={`decrease-qty-${item.id}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                        data-testid={`increase-qty-${item.id}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{getTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span data-testid="cart-total">₹{getTotal().toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-gold px-6 py-3 text-white font-medium"
                data-testid="checkout-btn"
              >
                Proceed to Checkout
              </button>
              <Link to="/shop" className="block text-center mt-4 text-sm text-gray-600 hover:text-[#C9A961]">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
