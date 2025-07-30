'use client';
import React from 'react';

type LoaderProps = {
  message?: string;
};

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-blue-600">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-2 bg-white rounded-full" />
      </div>
      <p className="mt-4 text-lg font-semibold animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
