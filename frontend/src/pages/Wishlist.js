import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { toast } from '../hooks/use-toast';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlistProducts = useCallback(async () => {
    if (wishlist.length === 0) {
      setLoading(false);
      return;
    }
    try {
      const productIds = wishlist.map(item => item.productId);
      const promises = productIds.map(id =>
        api.get(`/products/${id}`).catch(err => {
          console.warn(`Product ${id} not found`);
          return null;
        })
      );
      const responses = await Promise.all(promises);
      setProducts(responses.filter(res => res !== null).map(res => res.data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
      toast.error('Failed to load wishlist');
      setLoading(false);
    }
  }, [wishlist]);

  useEffect(() => {
    fetchWishlistProducts();
  }, [fetchWishlistProducts]);

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
