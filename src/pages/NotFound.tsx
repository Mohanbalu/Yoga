import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-[#E2ECE9] text-[#1B3B36] flex items-center justify-center font-serif-luxury font-bold text-2xl">
        404
      </div>
      <h1 className="font-serif-luxury text-3xl font-bold text-[#1B3B36]">Page In Stillness</h1>
      <p className="text-xs text-[#6B857B] max-w-sm">
        The sanctuary page you are looking for does not exist or has moved. Return back to find balance.
      </p>
      <Link
        to="/"
        className="bg-[#1B3B36] text-white px-6 py-3 rounded-2xl text-xs font-bold hover:bg-[#2C524B] transition-all cursor-pointer flex items-center gap-2 shadow-md mt-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
};
