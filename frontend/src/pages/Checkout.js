import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from '../hooks/use-toast';
import { useApp } from '../context/AppContext';

const Checkout = () => {
  const { cart, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/orders`, {
        items: cart,
        total: getTotal(),
        address: formData,
        paymentMethod: formData.paymentMethod
      });
      await clearCart();
      toast.success('Order placed successfully! Thank you for your purchase.');
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const getTotal = () => {
    // Note: This calculation will be fixed when backend adds price to cart items
    // For now, using item.price if available, otherwise 0
    return cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}} data-testid="checkout-title">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-[#C9A961]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#C9A961] text-white' : 'bg-gray-300'}`}>1</div>
            <span className="ml-2 hidden sm:inline">Address</span>
          </div>
          <div className="w-16 h-0.5 bg-gray-300 mx-4" />
          <div className={`flex items-center ${step >= 2 ? 'text-[#C9A961]' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#C9A961] text-white' : 'bg-gray-300'}`}>2</div>
            <span className="ml-2 hidden sm:inline">Payment</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" data-testid="name-input" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" data-testid="email-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" data-testid="phone-input" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows="3" className="w-full border border-gray-300 rounded px-4 py-2" data-testid="address-input" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pincode *</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="btn-gold px-6 py-3 text-white font-medium" data-testid="continue-to-payment-btn">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Payment Options</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:border-[#C9A961]">
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="mr-3" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">Pay when you receive your order</p>
                  </div>
                </label>
                <label className="flex items-center p-4 border border-gray-300 rounded cursor-pointer hover:border-[#C9A961] opacity-50">
                  <input type="radio" name="paymentMethod" value="razorpay" disabled className="mr-3" />
                  <div>
                    <p className="font-medium">Online Payment (Razorpay)</p>
                    <p className="text-sm text-gray-600">Cards, UPI, Net Banking, Wallets</p>
                    <p className="text-xs text-gray-500 mt-1">Integration stub - Add your Razorpay key to enable</p>
                  </div>
                </label>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total Amount:</span>
                  <span>₹{getTotal().toLocaleString('en-IN')}</span>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 border-2 border-gray-300 px-6 py-3 font-medium rounded hover:bg-gray-50">
                    Back
                  </button>
                  <button type="submit" className="flex-1 btn-gold px-6 py-3 text-white font-medium" data-testid="place-order-btn">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
