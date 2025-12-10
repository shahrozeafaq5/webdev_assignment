"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { slideInLeft, staggerContainer, textReveal, fadeInUp } from "@/lib/animations";

// 1. Import Hooks
import { useCart } from "@/context/CartContext"; 
import { useFavorites } from "@/context/FavoritesContext"; 

export default function BookDetailsClient({ book }) { 
  const { addToCart } = useCart(); 
  
  // 2. Get Favorites Logic
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!book) return <div className="p-20 text-center font-serif text-2xl">Book unavailable.</div>;

  // 3. Check if this specific book is favorited
  const isFav = isFavorite(book._id);

  return (
    <main className="min-h-screen bg-[#FDFBF7] overflow-hidden">
      
      <div className="flex flex-col lg:flex-row min-h-screen items-stretch ">
        
        {/* --- LEFT SECTION (Visuals) --- */}
        <motion.section 
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="relative w-full lg:w-[45%] bg-[#101010] text-white flex flex-col items-center justify-center p-12 overflow-hidden z-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800/40 via-[#101010] to-[#101010]" />

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }}
            className="absolute top-8 left-8 z-30"
          >
            <Link href="/books" className="text-xs font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
                &larr; Back
            </Link>
          </motion.div>

          <div className="relative z-10 perspective-1000">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img
                  src={book.coverImage || book.cover} 
                  alt={book.title}
                  className="relative w-64 md:w-80 shadow-2xl shadow-black rounded-sm"
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="relative z-10 mt-12 text-[10px] tracking-[0.3em] uppercase"
          >
            Special Edition
          </motion.div>
        </motion.section>

        {/* --- RIGHT SECTION (Details) --- */}
        <motion.section 
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-[55%] flex flex-col justify-center bg-[#FDFBF7] p-8 md:p-20 lg:p-24 z-10"
        >
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto w-full"
          >
            {/* Category Tag */}
            <motion.div variants={textReveal} className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-stone-300"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-stone-400">
                {book.category}
              </span>
            </motion.div>

            {/* Title */}
            <div className="overflow-hidden mb-4">
              <motion.h1 
                variants={textReveal}
                className="font-serif text-5xl md:text-7xl text-[#1c1917] leading-[1.1]"
              >
                {book.title}
              </motion.h1>
            </div>

            {/* Author */}
            <motion.p variants={textReveal} className="text-stone-500 font-medium italic mb-10 text-lg">
              by {book.author}
            </motion.p>

            {/* Description */}
            <motion.div variants={textReveal} className="prose prose-lg prose-stone leading-relaxed text-stone-600 mb-12">
              <p>{book.description}</p>
            </motion.div>

            <motion.div 
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "circOut" }}
              className="w-full h-px bg-stone-200 mb-10" 
            />

            {/* Price & Buttons */}
            <motion.div variants={textReveal} className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-2">Total</p>
                <div className="font-serif text-4xl text-[#1c1917]">
                  Rs {book.price ? book.price.toLocaleString() : 'N/A'} 
                </div>
              </div>

              <div className="flex items-center gap-4 w-full xl:w-auto">
                <motion.button 
                  onClick={() => addToCart(book)} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 xl:flex-none bg-[#1c1917] text-[#FDFBF7] h-14 px-10 rounded-full font-medium tracking-wide hover:bg-stone-800 transition-colors shadow-xl shadow-stone-200"
                >
                  Add to Cart
                </motion.button>
                
                {/* 4. Updated Heart Button */}
                <motion.button 
                  onClick={() => toggleFavorite(book)}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-14 w-14 flex items-center justify-center rounded-full border transition-colors ${
                    isFav 
                      ? "bg-red-50 border-red-200 text-red-500" 
                      : "border-stone-200 text-stone-400 hover:border-[#1c1917] hover:text-red-600"
                  }`}
                >
                  {isFav ? "❤️" : "♥"}
                </motion.button>
              </div>
            </motion.div>

          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}