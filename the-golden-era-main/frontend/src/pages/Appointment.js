import React, { useState } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    preferredStore: '',
    date: '',
    time: '',
    purpose: 'bridal'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/appointments`, formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" data-testid="appointment-success">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">We'll contact you shortly to confirm your appointment.</p>
          <button onClick={() => setSubmitted(false)} className="btn-gold px-6 py-2 text-white">
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}} data-testid="appointment-title">
          Book an Appointment
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Get personalized guidance from our jewelry experts
        </p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" data-testid="appointment-name-input" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Store</label>
            <select name="preferredStore" value={formData.preferredStore} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2">
              <option value="">Select a store</option>
              <option value="Mumbai">Mumbai Flagship</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Preferred Time *</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Purpose of Visit *</label>
            <select name="purpose" value={formData.purpose} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2">
              <option value="bridal">Bridal Jewelry</option>
              <option value="gifting">Gifting</option>
              <option value="daily">Daily Wear</option>
              <option value="investment">Investment</option>
              <option value="exchange">Old Gold Exchange</option>
            </select>
          </div>

          <button type="submit" className="w-full btn-gold px-6 py-3 text-white font-medium" data-testid="book-appointment-btn">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
