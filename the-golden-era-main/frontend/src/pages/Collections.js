import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Collections = () => {
  const { slug } = useParams();

  const collections = [
    {
      id: 'bridal',
      name: 'Bridal Collection',
      description: 'Exquisite pieces for your special day',
      image: 'https://images.pexels.com/photos/10117812/pexels-photo-10117812.jpeg'
    },
    {
      id: 'heritage',
      name: 'Heritage Collection',
      description: 'Traditional designs with timeless appeal',
      image: 'https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg'
    },
    {
      id: 'contemporary',
      name: 'Contemporary Collection',
      description: 'Modern designs for the modern you',
      image: 'https://images.pexels.com/photos/10117812/pexels-photo-10117812.jpeg'
    },
    {
      id: 'diamond',
      name: 'Diamond Collection',
      description: 'Brilliant diamonds in stunning settings',
      image: 'https://images.pexels.com/photos/8084610/pexels-photo-8084610.jpeg'
    }
  ];

  if (slug) {
    const collection = collections.find(c => c.id === slug);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/collections" className="text-[#C9A961] hover:underline mb-4 inline-block">
            ← Back to Collections
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{fontFamily: 'Playfair Display'}}>
            {collection?.name}
          </h1>
          <p className="text-lg text-gray-600 mb-8">{collection?.description}</p>
          <Link to={`/shop?tags=${slug}`} className="btn-gold px-6 py-3 text-white inline-block">
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" style={{fontFamily: 'Playfair Display'}}>
          Our Collections
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Curated collections celebrating different occasions, styles, and moments in your life
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map(collection => (
            <Link 
              key={collection.id} 
              to={`/collections/${collection.id}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                <div>
                  <h2 className="text-white text-2xl font-bold mb-2">{collection.name}</h2>
                  <p className="text-gray-200">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
