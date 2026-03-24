'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
          <p className="text-gray-600 mb-8">
            {error.message || 'An unexpected error occurred. Please try again later.'}
          </p>
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}