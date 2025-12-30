import React from 'react';

export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse" role="status" aria-label="Loading product">
    {/* Image skeleton */}
    <div className="w-full aspect-square bg-gray-200" />

    <div className="p-4 space-y-3">
      {/* Category */}
      <div className="h-3 bg-gray-200 rounded w-1/3" />

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4" />

      {/* Price */}
      <div className="h-5 bg-gray-200 rounded w-1/2" />

      {/* Rating */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Button */}
      <div className="h-10 bg-gray-200 rounded w-full mt-3" />
    </div>
    <span className="sr-only">Loading product information</span>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="products-skeleton">
    {[...Array(count)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);
