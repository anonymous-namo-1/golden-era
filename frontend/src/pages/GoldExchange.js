import React, { useState } from 'react';
import api from '../services/api';
import { toast } from '../hooks/use-toast';

const GoldExchange = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    goldType: '22K',
    approximateWeight: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/exchange-leads`, formData);
      toast.success('Request submitted successfully! We\'ll contact you soon.');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting exchange request:', error);
      toast.error('Failed to submit request. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-6">We'll contact you within 24 hours for evaluation.</p>
          <button onClick={() => setSubmitted(false)} className="btn-gold px-6 py-2 text-white">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
          Old Gold Exchange
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Exchange your old gold jewelry for new pieces. Get the best value with transparent pricing and instant evaluation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="font-medium mb-1">Submit Request</h3>
                  <p className="text-sm text-gray-600">Fill out the form with your details and approximate gold weight</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="font-medium mb-1">Visit Store</h3>
                  <p className="text-sm text-gray-600">Bring your old gold to our nearest store for evaluation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A961] text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="font-medium mb-1">Get Best Value</h3>
                  <p className="text-sm text-gray-600">Receive transparent valuation and exchange for new jewelry</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Get Evaluation</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Gold Type *</label>
              <select name="goldType" value={formData.goldType} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2">
                <option value="22K">22 Karat</option>
                <option value="18K">18 Karat</option>
                <option value="14K">14 Karat</option>
                <option value="24K">24 Karat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Approximate Weight *</label>
              <input type="text" name="approximateWeight" value={formData.approximateWeight} onChange={handleChange} placeholder="e.g., 10 grams" required className="w-full border border-gray-300 rounded px-4 py-2" />
            </div>
            <button type="submit" className="w-full btn-gold px-6 py-3 text-white font-medium">
              Request Evaluation
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">What types of gold do you accept?</h3>
              <p className="text-sm text-gray-600">We accept all forms of gold jewelry including broken pieces, coins, and bars in 14K, 18K, 22K, and 24K purity.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How is the value determined?</h3>
              <p className="text-sm text-gray-600">We use certified weighing scales and calculate based on current gold rates, purity, and weight. The process is completely transparent.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I get cash instead of exchange?</h3>
              <p className="text-sm text-gray-600">Yes, you can choose to receive the value in cash or use it towards purchasing new jewelry from our collection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldExchange;
