"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext"; 
import { motion, AnimatePresence } from "framer-motion";

function CartIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 6.5h15l-1.5 8.5H8L6.5 6.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M6.5 6.5 6 4.5H3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  );
}

export default function Navbar() {
  // 1. Get the real-time count from your Context
  const { totalItems } = useCart(); 

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-black/10">
      <div className="max-w-7xl mx-auto h-16 px-5 md:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-peach/60 border border-black/10 group-hover:scale-105 transition-transform">
            <img src="/logo.png" alt="logo" />
          </span>
          <span className="text-xl md:text-2xl font-semibold tracking-tight">
            PaperHaven
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] text-cocoa">
          <Link className="hover:text-ink transition" href="/">Home</Link>
          <Link className="hover:text-ink transition" href="/books">Books</Link>
          <Link className="hover:text-ink transition" href="/about">About</Link>
          {/* Added Favourites Link */}
          <Link className="hover:text-ink transition flex items-center gap-1" href="/favorites">
            Favourites <span className="text-[10px]">❤️</span>
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/books"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white border border-black/10 text-sm hover:shadow-soft transition hover:-translate-y-0.5"
          >
            Browse
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-black/10 hover:shadow-soft transition hover:-translate-y-0.5 group"
            aria-label="Cart"
          >
            <CartIcon />
            <span className="hidden sm:inline text-sm text-cocoa group-hover:text-ink">Cart</span>

            {/* DYNAMIC NOTIFICATION BADGE */}
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full bg-[#1c1917] text-white text-[10px] font-bold grid place-items-center border-2 border-[#FDFBF7]"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}