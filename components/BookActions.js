// components/BookActions.js
"use client";

import { useState } from "react";

export default function BookActions({ price }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      setIsAdding(false);
      alert("Added to cart! (Demo)");
    }, 800);
  };

  return (
    <div className="flex gap-3 mt-8">
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="flex-1 sm:flex-none px-8 py-3.5 rounded-2xl bg-black text-white hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95 shadow-lg shadow-black/10 font-medium"
      >
        {isAdding ? "Adding..." : `Add to Cart - Rs ${price}`}
      </button>
      <button className="h-[52px] w-[52px] flex items-center justify-center rounded-2xl bg-white border border-black/10 hover:border-black/30 hover:shadow-md transition-all active:scale-95 text-2xl text-cocoa">
        ♡
      </button>
    </div>
  );
}