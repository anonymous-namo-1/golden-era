import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToWishlist, isInWishlist, addToCart } = useApp();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product.id);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group block" data-testid={`product-card-${product.id}`}>
      <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-2xl">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleWishlist}
            className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#C9A961] hover:text-white transition-all duration-300 hover:scale-110"
            data-testid={`wishlist-btn-${product.id}`}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-current text-[#C9A961]' : ''}`} />
          </button>
          <button 
            onClick={handleQuickAdd}
            className="p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#C9A961] hover:text-white transition-all duration-300 hover:scale-110"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
        {product.availability?.storePickup && (
          <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold rounded-full shadow-md">
            Available in Store
          </span>
        )}
      </div>
      <div className="p-5 bg-white rounded-b-2xl">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 pr-2 group-hover:text-[#C9A961] transition-colors">{product.name}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3">{product.metal} • {product.purity}</p>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="font-medium text-gray-700">{product.rating}</span>
            <span className="text-gray-400">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
