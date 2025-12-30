import React from 'react';
import { AlertCircle, RefreshCw, Home, ShoppingBag, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ErrorState = ({
  title = "Something went wrong",
  message,
  onRetry,
  showHomeButton = true,
  icon: Icon = AlertCircle
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Icon className="h-8 w-8 text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Playfair Display'}}>
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message || "Please try again or contact support if the problem persists."}
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center px-4 py-2 bg-[#C9A961] hover:bg-[#B89647] text-white font-medium rounded-lg transition-colors"
              aria-label="Try loading again"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </button>
          )}

          {showHomeButton && (
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
              aria-label="Go to homepage"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </button>
          )}
        </div>

        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 text-center">
            Technical Details
          </summary>
          <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto text-left">
            {JSON.stringify({
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              url: window.location.href
            }, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

// Context-specific error components
export const ProductsErrorState = ({ onRetry }) => (
  <ErrorState
    title="Unable to Load Products"
    message="We couldn't fetch the product catalog. This might be due to a temporary network issue or server maintenance. Please check that the backend API is running and properly configured."
    onRetry={onRetry}
    icon={ShoppingBag}
  />
);

export const StoresErrorState = ({ onRetry }) => (
  <ErrorState
    title="Unable to Load Store Locations"
    message="We couldn't retrieve our store information. Please check your internet connection or try again in a moment."
    onRetry={onRetry}
    icon={MapPin}
  />
);

export const ProductDetailErrorState = ({ onRetry }) => (
  <ErrorState
    title="Product Not Found"
    message="This product doesn't exist or has been removed. You may have followed an outdated link."
    onRetry={onRetry}
    icon={ShoppingBag}
  />
);

export const CartErrorState = ({ onRetry }) => (
  <ErrorState
    title="Unable to Load Cart"
    message="We couldn't retrieve your cart items. Please check your connection and try again."
    onRetry={onRetry}
    icon={ShoppingBag}
  />
);

export const WishlistErrorState = ({ onRetry }) => (
  <ErrorState
    title="Unable to Load Wishlist"
    message="We couldn't retrieve your saved items. Please check your connection and try again."
    onRetry={onRetry}
    icon={ShoppingBag}
  />
);
