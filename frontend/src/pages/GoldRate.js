import React from 'react';
import { TrendingUp } from 'lucide-react';

const GoldRate = () => {
  const currentDate = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
          Today's Gold Rate
        </h1>
        <p className="text-center text-gray-600 mb-2">Last Updated: {currentDate}</p>
        <p className="text-center text-sm text-gray-500 mb-12">Rates are subject to change. Visit our stores for the latest rates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display'}}>24 Karat Gold</h2>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per Gram</span>
                <span className="text-3xl font-bold text-[#C9A961]">₹6,350</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per 10 Grams</span>
                <span className="text-xl font-semibold">₹63,500</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold" style={{fontFamily: 'Playfair Display'}}>22 Karat Gold</h2>
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per Gram</span>
                <span className="text-3xl font-bold text-[#C9A961]">₹5,820</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per 10 Grams</span>
                <span className="text-xl font-semibold">₹58,200</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>18 Karat Gold</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per Gram</span>
                <span className="text-3xl font-bold text-[#C9A961]">₹4,760</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per 10 Grams</span>
                <span className="text-xl font-semibold">₹47,600</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>Silver (999)</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per Gram</span>
                <span className="text-3xl font-bold text-[#C9A961]">₹78</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-gray-600">Per Kg</span>
                <span className="text-xl font-semibold">₹78,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Gold rates are indicative and may vary based on market conditions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Making charges and GST are additional</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Rates updated daily at 10:00 AM IST</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>For the most accurate rates, please visit our stores or contact us</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GoldRate;
