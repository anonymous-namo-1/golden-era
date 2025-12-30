import React from 'react';

export const ProductDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50 py-8" role="status" aria-label="Loading product details">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="w-full aspect-square bg-gray-200 rounded-lg" />

          {/* Thumbnail strip */}
          <div className="flex gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Category */}
          <div className="h-4 bg-gray-200 rounded w-1/4" />

          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-8 bg-gray-200 rounded w-1/2" />
          </div>

          {/* Rating */}
          <div className="flex gap-2 items-center">
            <div className="h-5 bg-gray-200 rounded w-32" />
            <div className="h-5 bg-gray-200 rounded w-20" />
          </div>

          {/* Price */}
          <div className="h-10 bg-gray-200 rounded w-1/3" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Specifications */}
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <div className="h-12 bg-gray-200 rounded flex-1" />
            <div className="h-12 bg-gray-200 rounded w-12" />
          </div>
        </div>
      </div>
    </div>
    <span className="sr-only">Loading product details</span>
  </div>
);
