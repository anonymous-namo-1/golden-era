import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Wishlist = () => {
  const { wishlist } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wishlist]);

  const fetchWishlistProducts = async () => {
    if (wishlist.length === 0) {
      setLoading(false);
      return;
    }
    try {
      const productIds = wishlist.map(item => item.productId);
      const promises = productIds.map(id => 
        axios.get(`${API}/products/${id}`).catch(err => {
          console.warn(`Product ${id} not found`);
          return null;
        })
      );
      const responses = await Promise.all(promises);
      setProducts(responses.filter(res => res !== null).map(res => res.data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite pieces to revisit later</p>
          <Link to="/shop" className="btn-gold px-6 py-3 text-white inline-block">
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}}>
          My Wishlist ({wishlist.length})
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
