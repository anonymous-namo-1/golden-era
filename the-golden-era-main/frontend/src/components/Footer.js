import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#2C2C2C] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#C9A961] mb-4" style={{fontFamily: 'Playfair Display'}}>
              The Golden Era
            </h2>
            <p className="text-sm mb-4">
              Heritage craft. Modern elegance. Celebrating the art of fine jewelry since our inception.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#C9A961] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#C9A961] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-[#C9A961] transition-colors"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-[#C9A961] transition-colors">All Jewellery</Link></li>
              <li><Link to="/shop?metal=Gold" className="hover:text-[#C9A961] transition-colors">Gold</Link></li>
              <li><Link to="/shop?metal=Silver" className="hover:text-[#C9A961] transition-colors">Silver</Link></li>
              <li><Link to="/shop?metal=Diamond" className="hover:text-[#C9A961] transition-colors">Diamond</Link></li>
              <li><Link to="/collections" className="hover:text-[#C9A961] transition-colors">Collections</Link></li>
              <li><Link to="/shop" className="hover:text-[#C9A961] transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/stores" className="hover:text-[#C9A961] transition-colors">Store Locator</Link></li>
              <li><Link to="/book-appointment" className="hover:text-[#C9A961] transition-colors">Book Appointment</Link></li>
              <li><Link to="/gold-exchange" className="hover:text-[#C9A961] transition-colors">Old Gold Exchange</Link></li>
              <li><Link to="/gold-rate" className="hover:text-[#C9A961] transition-colors">Gold Rate Today</Link></li>
              <li><Link to="/guides" className="hover:text-[#C9A961] transition-colors">Jewellery Guides</Link></li>
            </ul>
          </div>

          {/* Contact & Policies */}
          <div>
            <h3 className="text-white font-semibold mb-4">Information</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link to="/about" className="hover:text-[#C9A961] transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9A961] transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-[#C9A961] transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-[#C9A961] transition-colors">Returns & Exchange</Link></li>
              <li><Link to="/privacy" className="hover:text-[#C9A961] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-[#C9A961] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm mb-4">Get updates on new arrivals, exclusive offers, and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#C9A961]"
              />
              <button type="submit" className="btn-gold px-6 py-2 text-white font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-sm text-center">
          <p>&copy; 2025 The Golden Era. All rights reserved. Crafted with excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
