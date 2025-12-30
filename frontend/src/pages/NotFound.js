import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-16">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-[#C9A961] bg-opacity-10 rounded-full mb-6">
            <span className="text-8xl font-bold text-[#C9A961]" style={{fontFamily: 'Playfair Display'}}>
              404
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Playfair Display'}}>
            Page Not Found
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="px-8 py-3 bg-[#C9A961] hover:bg-[#B89647] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Go to Homepage
          </Link>
          <Link
            to="/shop"
            className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Browse Products
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/collections" className="text-[#C9A961] hover:text-[#B89647] font-medium text-sm">
              Collections
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/stores" className="text-[#C9A961] hover:text-[#B89647] font-medium text-sm">
              Our Stores
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/contact" className="text-[#C9A961] hover:text-[#B89647] font-medium text-sm">
              Contact Us
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/gold-rate" className="text-[#C9A961] hover:text-[#B89647] font-medium text-sm">
              Gold Rates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
