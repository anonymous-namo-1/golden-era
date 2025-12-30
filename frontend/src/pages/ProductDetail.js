import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingCart, ChevronRight, ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import ProductCard from '../components/ProductCard';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist, isInWishlist } = useApp();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchRelated();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API}/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await axios.get(`${API}/products/related/${id}`);
      setRelated(res.data);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  const handleAddToCart = async () => {
    const success = await addToCart(product.id, 1, selectedSize);
    if (success) {
      alert('Added to cart!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop" className="btn-gold px-6 py-2 text-white">Browse Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/shop">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/shop/${product.category}`}>{product.category}</Link>
          <ChevronRight className="h-4 w-4" />
          <span>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" data-testid="main-product-image" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded border-2 overflow-hidden ${selectedImage === idx ? 'border-[#C9A961]' : 'border-gray-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}} data-testid="product-name">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">★</span>
              <span className="font-medium">{product.rating}</span>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900" data-testid="product-price">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="text-sm text-gray-500 mt-1">Price inclusive of all taxes</p>
              <button 
                onClick={() => setShowPriceBreakup(!showPriceBreakup)}
                className="text-sm text-[#C9A961] hover:underline mt-2 flex items-center"
              >
                See full price breakup <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showPriceBreakup ? 'rotate-180' : ''}`} />
              </button>
              {showPriceBreakup && product.priceBreakup && (
                <div className="mt-4 p-4 bg-gray-50 rounded text-sm">
                  <div className="flex justify-between mb-2">
                    <span>Metal Cost:</span>
                    <span>₹{product.priceBreakup.metalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Stone Cost:</span>
                    <span>₹{product.priceBreakup.stoneCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Making Charges:</span>
                    <span>₹{product.priceBreakup.makingCharges.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-2">
                    <span>GST (3%):</span>
                    <span>₹{product.priceBreakup.gst.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Metal & Purity */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Metal</p>
                  <p className="font-medium">{product.metal} {product.purity}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-500">Metal Color</p>
                  <p className="font-medium">{product.metalColor}</p>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {product.dimensions?.sizes && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Select Size</label>
                <div className="flex gap-2">
                  {product.dimensions.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded ${selectedSize === size ? 'border-[#C9A961] bg-[#C9A961] text-white' : 'border-gray-300 hover:border-[#C9A961]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-gold px-6 py-3 text-white font-medium flex items-center justify-center"
                data-testid="add-to-cart-btn"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </button>
              <button 
                onClick={() => addToWishlist(product.id)}
                className="px-6 py-3 border-2 border-gray-300 rounded hover:border-[#C9A961] transition-colors"
                data-testid="add-to-wishlist-btn"
              >
                <Heart className={isInWishlist(product.id) ? 'fill-current text-[#C9A961]' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded text-sm">
                <p className="font-medium">✓ Certified Authentic</p>
              </div>
              <div className="p-3 bg-gray-50 rounded text-sm">
                <p className="font-medium">✓ 30-Day Returns</p>
              </div>
              <div className="p-3 bg-gray-50 rounded text-sm">
                <p className="font-medium">✓ Lifetime Maintenance</p>
              </div>
              <div className="p-3 bg-gray-50 rounded text-sm">
                <p className="font-medium">✓ Free Cleaning</p>
              </div>
            </div>

            {/* Availability */}
            {product.availability?.storePickup && (
              <div className="p-4 bg-green-50 rounded mb-6">
                <p className="text-sm font-medium text-green-900">Available for Store Pickup</p>
                <Link to="/stores" className="text-sm text-green-700 hover:underline">Find a store near you</Link>
              </div>
            )}
          </div>
        </div>

        {/* Details Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="metal">Metal Details</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6 space-y-4">
              <p>SKU: {product.sku}</p>
              <p>Category: {product.category}</p>
              <p>Gross Weight: {product.grossWeight}g</p>
              <p>Occasions: {product.occasion.join(', ')}</p>
              {product.stoneDetails && (
                <div>
                  <h4 className="font-semibold mb-2">Stone Details</h4>
                  <p>Type: {product.stoneDetails.type}</p>
                  <p>Carat: {product.stoneDetails.carat}</p>
                  <p>Clarity: {product.stoneDetails.clarity}</p>
                  <p>Color: {product.stoneDetails.color}</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="metal" className="mt-6">
              <p>Metal Type: {product.metal}</p>
              <p>Purity: {product.purity}</p>
              <p>Metal Color: {product.metalColor}</p>
              <p>Weight: {product.grossWeight}g</p>
            </TabsContent>
            <TabsContent value="care" className="mt-6 space-y-2">
              <p>• Store in a fabric-lined jewelry box, separately from other jewelry</p>
              <p>• Avoid contact with perfumes, lotions, and chemicals</p>
              <p>• Clean with a soft cloth regularly</p>
              <p>• Remove before bathing, swimming, or exercising</p>
              <p>• Bring to our store for professional cleaning (free service)</p>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6 space-y-2">
              <p>• Free shipping on all orders</p>
              <p>• Delivery within 5-7 business days</p>
              <p>• 30-day easy return and exchange policy</p>
              <p>• Products are insured during transit</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{fontFamily: 'Playfair Display'}}>
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
