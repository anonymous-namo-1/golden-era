import React from 'react';

export const StoreCardSkeleton = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm animate-pulse" role="status" aria-label="Loading store">
    {/* Store name */}
    <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />

    {/* Address lines */}
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>

    {/* Contact info */}
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
    </div>

    {/* Button */}
    <div className="h-10 bg-gray-200 rounded w-full mt-4" />

    <span className="sr-only">Loading store information</span>
  </div>
);

export const StoreGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(count)].map((_, i) => (
      <StoreCardSkeleton key={i} />
    ))}
  </div>
);
