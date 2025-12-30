import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Stores from './pages/Stores';
import Appointment from './pages/Appointment';
import GoldExchange from './pages/GoldExchange';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import GoldRate from './pages/GoldRate';
import Guides from './pages/Guides';
import Collections from './pages/Collections';
import PolicyPage from './pages/PolicyPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/book-appointment" element={<Appointment />} />
              <Route path="/gold-exchange" element={<GoldExchange />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account/wishlist" element={<Wishlist />} />
              <Route path="/gold-rate" element={<GoldRate />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:type" element={<Guides />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:slug" element={<Collections />} />
              <Route path="/shipping" element={<PolicyPage type="shipping" />} />
              <Route path="/returns" element={<PolicyPage type="returns" />} />
              <Route path="/privacy" element={<PolicyPage type="privacy" />} />
              <Route path="/terms" element={<PolicyPage type="terms" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
