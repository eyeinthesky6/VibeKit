"use client";
import React from 'react';
// Simple client-side logger
const logger = {
    error: (context, message) => {
        console.error(`${message}:`, context.err);
    }
};
export default function RootError({ error, reset }) {
    React.useEffect(() => {
        logger.error({ err: error }, 'Unhandled error in RootError');
    }, [error]);
    return (<html lang="en">
      <body className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-6 bg-white rounded shadow-md">
          <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
          <p className="mb-4">{error.message}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>);
}
