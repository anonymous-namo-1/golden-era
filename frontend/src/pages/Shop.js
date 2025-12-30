import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { toast } from '../hooks/use-toast';
import ProductCard from '../components/ProductCard';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';

const Shop = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000000,
    metal: searchParams.get('metal') || '',
    purity: '',
    metalColor: '',
    occasion: searchParams.get('occasion') || '',
    gender: searchParams.get('gender') || '',
  });
  const [sort, setSort] = useState('featured');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.append('category', category);

      // Add search query if present
      const searchQuery = searchParams.get('search');
      if (searchQuery) params.append('search', searchQuery);

      if (filters.metal) params.append('metal', filters.metal);
      if (filters.purity) params.append('purity', filters.purity);
      if (filters.metalColor) params.append('metalColor', filters.metalColor);
      if (filters.occasion) params.append('occasion', filters.occasion);
      if (filters.gender) params.append('gender', filters.gender);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice < 1000000) params.append('maxPrice', filters.maxPrice);
      params.append('sort', sort);

      const res = await api.get(`/products?${params}`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    }
    setLoading(false);
  }, [category, filters, sort, searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="font-semibold mb-4 text-lg">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>₹{filters.minPrice.toLocaleString()}</span>
                    <span>₹{filters.maxPrice.toLocaleString()}</span>
                  </div>
                  <Slider
                    min={0}
                    max={1000000}
                    step={10000}
                    value={[filters.maxPrice]}
                    onValueChange={([value]) => handleFilterChange('maxPrice', value)}
                  />
                </div>
              </div>

              {/* Metal */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Metal</h4>
                <div className="space-y-2">
                  {['Gold', 'Silver', 'Diamond'].map(metal => (
                    <label key={metal} className="flex items-center">
                      <Checkbox 
                        checked={filters.metal === metal}
                        onCheckedChange={() => handleFilterChange('metal', filters.metal === metal ? '' : metal)}
                      />
                      <span className="ml-2 text-sm">{metal}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Purity */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Purity</h4>
                <div className="space-y-2">
                  {['14K', '18K', '22K', '24K', '925'].map(purity => (
                    <label key={purity} className="flex items-center">
                      <Checkbox 
                        checked={filters.purity === purity}
                        onCheckedChange={() => handleFilterChange('purity', filters.purity === purity ? '' : purity)}
                      />
                      <span className="ml-2 text-sm">{purity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Metal Color */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Metal Color</h4>
                <div className="space-y-2">
                  {['Yellow', 'White', 'Rose', 'Silver'].map(color => (
                    <label key={color} className="flex items-center">
                      <Checkbox 
                        checked={filters.metalColor === color}
                        onCheckedChange={() => handleFilterChange('metalColor', filters.metalColor === color ? '' : color)}
                      />
                      <span className="ml-2 text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Occasion</h4>
                <div className="space-y-2">
                  {['Daily', 'Office', 'Party', 'Wedding', 'Festive'].map(occ => (
                    <label key={occ} className="flex items-center">
                      <Checkbox 
                        checked={filters.occasion === occ}
                        onCheckedChange={() => handleFilterChange('occasion', filters.occasion === occ ? '' : occ)}
                      />
                      <span className="ml-2 text-sm">{occ}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Gender</h4>
                <div className="space-y-2">
                  {['Women', 'Men', 'Unisex'].map(gen => (
                    <label key={gen} className="flex items-center">
                      <Checkbox 
                        checked={filters.gender === gen}
                        onCheckedChange={() => handleFilterChange('gender', filters.gender === gen ? '' : gen)}
                      />
                      <span className="ml-2 text-sm">{gen}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold" style={{fontFamily: 'Playfair Display'}}>
                  {category || 'All Jewellery'}
                </h1>
                <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
                data-testid="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
              </div>
              {searchParams.get('search') && (
                <div className="mt-3 text-gray-600">
                  Showing results for: <span className="font-semibold text-gray-900">"{searchParams.get('search')}"</span>
                </div>
              )}
            </div>

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="products-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {products.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-500">No products found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
