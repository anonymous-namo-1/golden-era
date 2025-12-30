import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart, wishlist } = useApp();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 glass border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#C9A961] to-[#B89647] bg-clip-text text-transparent group-hover:scale-105 transition-transform" style={{fontFamily: 'Playfair Display'}}>
                The Golden Era
              </h1>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <div 
                className="relative"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <button className="flex items-center text-sm font-medium hover:text-[#C9A961] transition-colors" data-testid="shop-menu-button">
                  Shop <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {showMegaMenu && (
                  <div className="mega-menu active" data-testid="mega-menu">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6 xl:gap-8">
                      <div>
                        <h3 className="font-semibold mb-3 text-[#C9A961]">By Category</h3>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/shop" className="hover:text-[#C9A961]">All Jewellery</Link></li>
                          <li><Link to="/shop/Ring" className="hover:text-[#C9A961]">Rings</Link></li>
                          <li><Link to="/shop/Earrings" className="hover:text-[#C9A961]">Earrings</Link></li>
                          <li><Link to="/shop/Necklace" className="hover:text-[#C9A961]">Necklaces</Link></li>
                          <li><Link to="/shop/Bracelet" className="hover:text-[#C9A961]">Bracelets</Link></li>
                          <li><Link to="/shop/Bangle" className="hover:text-[#C9A961]">Bangles</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-[#C9A961]">By Metal</h3>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/shop?metal=Gold" className="hover:text-[#C9A961]">Gold</Link></li>
                          <li><Link to="/shop?metal=Silver" className="hover:text-[#C9A961]">Silver</Link></li>
                          <li><Link to="/shop?metal=Diamond" className="hover:text-[#C9A961]">Diamond</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-[#C9A961]">By Occasion</h3>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/shop?occasion=Wedding" className="hover:text-[#C9A961]">Wedding</Link></li>
                          <li><Link to="/shop?occasion=Party" className="hover:text-[#C9A961]">Party</Link></li>
                          <li><Link to="/shop?occasion=Daily" className="hover:text-[#C9A961]">Daily Wear</Link></li>
                          <li><Link to="/shop?occasion=Festive" className="hover:text-[#C9A961]">Festive</Link></li>
                          <li><Link to="/shop?occasion=Office" className="hover:text-[#C9A961]">Office</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-[#C9A961]">By Gender</h3>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/shop?gender=Women" className="hover:text-[#C9A961]">Women</Link></li>
                          <li><Link to="/shop?gender=Men" className="hover:text-[#C9A961]">Men</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-[#C9A961]">Collections</h3>
                        <ul className="space-y-2 text-sm">
                          <li><Link to="/collections" className="hover:text-[#C9A961]">All Collections</Link></li>
                          <li><Link to="/shop?tags=bridal" className="hover:text-[#C9A961]">Bridal</Link></li>
                          <li><Link to="/shop" className="hover:text-[#C9A961]">New Arrivals</Link></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link to="/collections" className="text-sm font-medium hover:text-[#C9A961] transition-colors whitespace-nowrap">Collections</Link>
              <Link to="/gold-rate" className="text-sm font-medium hover:text-[#C9A961] transition-colors whitespace-nowrap">Gold Rate</Link>
              <Link to="/stores" className="text-sm font-medium hover:text-[#C9A961] transition-colors whitespace-nowrap">Stores</Link>
              <Link to="/guides" className="text-sm font-medium hover:text-[#C9A961] transition-colors whitespace-nowrap">Guides</Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              <button className="hidden md:block hover:scale-110 transition-transform" onClick={() => navigate('/shop')} data-testid="search-button">
                <Search className="h-5 w-5 text-gray-700 hover:text-[#C9A961] transition-colors" />
              </button>
              <Link to="/account/wishlist" className="relative hover:scale-110 transition-transform" data-testid="wishlist-link">
                <Heart className="h-5 w-5 text-gray-700 hover:text-[#C9A961] transition-colors" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#C9A961] to-[#B89647] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative hover:scale-110 transition-transform" data-testid="cart-link">
                <ShoppingCart className="h-5 w-5 text-gray-700 hover:text-[#C9A961] transition-colors" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-[#C9A961] to-[#B89647] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button className="lg:hidden hover:scale-110 transition-transform" onClick={() => setShowMobileMenu(!showMobileMenu)} data-testid="mobile-menu-toggle">
                {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          <div className="mobile-menu-overlay open" onClick={() => setShowMobileMenu(false)} />
          <div className="mobile-menu open">
            <div className="p-6">
              <nav className="space-y-4">
                <Link to="/shop" className="block py-2 text-lg" onClick={() => setShowMobileMenu(false)}>Shop All</Link>
                <Link to="/shop?metal=Gold" className="block py-2" onClick={() => setShowMobileMenu(false)}>Gold</Link>
                <Link to="/shop?metal=Silver" className="block py-2" onClick={() => setShowMobileMenu(false)}>Silver</Link>
                <Link to="/collections" className="block py-2" onClick={() => setShowMobileMenu(false)}>Collections</Link>
                <Link to="/gold-rate" className="block py-2" onClick={() => setShowMobileMenu(false)}>Gold Rate</Link>
                <Link to="/stores" className="block py-2" onClick={() => setShowMobileMenu(false)}>Stores</Link>
                <Link to="/book-appointment" className="block py-2" onClick={() => setShowMobileMenu(false)}>Book Appointment</Link>
                <Link to="/gold-exchange" className="block py-2" onClick={() => setShowMobileMenu(false)}>Old Gold Exchange</Link>
                <Link to="/guides" className="block py-2" onClick={() => setShowMobileMenu(false)}>Guides</Link>
                <Link to="/about" className="block py-2" onClick={() => setShowMobileMenu(false)}>About Us</Link>
                <Link to="/contact" className="block py-2" onClick={() => setShowMobileMenu(false)}>Contact</Link>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
