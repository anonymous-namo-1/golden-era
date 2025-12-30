import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { toast } from '../hooks/use-toast';
import { MapPin, Phone, Clock } from 'lucide-react';
import { StoresErrorState } from '../components/ErrorState';
import { StoreGridSkeleton } from '../components/skeletons/StoreCardSkeleton';

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetDirections = (store) => {
    // Use Google Maps with store address or coordinates if available
    const address = encodeURIComponent(`${store.address}, ${store.city}`);
    const url = store.latitude && store.longitude
      ? `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${address}`;
    window.open(url, '_blank');
  };

  const fetchStores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = search ? `?city=${search}` : '';
      const res = await api.get(`/stores${params}`);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores:', err);
      setError(err);
      const errorMessage = err.response?.data?.detail ||
                          err.message ||
                          'Unable to load store locations. Please ensure the backend API is running.';
      toast.error(errorMessage);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // Show error state if there's an error
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{fontFamily: 'Playfair Display'}} data-testid="stores-title">
            Visit Our Stores
          </h1>
          <StoresErrorState onRetry={fetchStores} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{fontFamily: 'Playfair Display'}} data-testid="stores-title">
          Visit Our Stores
        </h1>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by city or pincode"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
            data-testid="store-search-input"
            aria-label="Search stores by city or pincode"
          />
        </div>

        {/* Stores Grid */}
        {loading ? (
          <StoreGridSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map(store => (
              <div key={store.id} className="bg-white p-6 rounded-lg shadow-sm" data-testid={`store-card-${store.id}`}>
                <h3 className="text-xl font-semibold mb-4">{store.name}</h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{store.address}, {store.city} - {store.pincode}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                    <a href={`tel:${store.phone}`} className="text-sm hover:text-[#C9A961]">{store.phone}</a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">{store.hours}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGetDirections(store)}
                  className="mt-4 w-full border-2 border-[#C9A961] text-[#C9A961] px-4 py-2 rounded hover:bg-[#C9A961] hover:text-white transition-colors"
                >
                  Get Directions
                </button>
              </div>
            ))}
          </div>
        )}

        {stores.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-500">No stores found in this location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stores;
