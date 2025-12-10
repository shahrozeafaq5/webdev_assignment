"use client";

import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard"; 
import Loader from "../../components/Loader"; 
import CategoryPills from "../../components/CategoryPills"; 
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations"; 

const categories = ["Fiction", "Self-help", "Thriller", "Lifestyle"];

export default function BooksPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null); 

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);
        const res = await fetch('/api/books', { cache: 'no-store' });

        if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);

        const result = await res.json();
        
        if (result.success) {
            setBooks(result.data); 
        } else {
            throw new Error(result.error || 'Unknown API error');
        }

      } catch (err) {
        console.error("Database connection failed or fetch error:", err);
        setError("Could not load books. Please check the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []); 

  // Filter Logic
  const filteredBooks = activeCategory === "All" 
    ? books 
    : books.filter((b) => {
        if (!b.category) return false;
        return b.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
    });

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917] px-6 py-16 selection:bg-[#1c1917] selection:text-[#FDFBF7]">
      
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <h1 className="font-serif text-5xl md:text-7xl mb-4 tracking-tight">Library</h1>
            <p className="text-stone-500 text-lg max-w-sm leading-relaxed">
              Curated volumes for the modern mind. <br/> Warm, cute, clean. Just vibes.
            </p>
          </motion.div>
        </div>

        {/* CATEGORY PILLS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <CategoryPills 
            categories={categories}
            active={activeCategory}
            onSelect={setActiveCategory} 
          />
        </motion.div>

        {/* BOOKS GRID */}
        {/* We moved AnimatePresence INSIDE the conditional rendering to avoid conflicts */}
        {error ? (
            <motion.div key="error" variants={fadeInUp} initial="hidden" animate="visible" className="mt-14 rounded-3xl bg-red-50 border border-red-200 p-16 text-center shadow-sm text-red-700">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="font-serif text-2xl mb-2">Error Loading Books</h3>
              <p>{error}</p>
            </motion.div>
        ) : loading ? (
          <motion.div key="loader" exit={{ opacity: 0 }} className="flex justify-center items-center py-32">
            <Loader />
          </motion.div>
        ) : filteredBooks.length === 0 ? (
          <motion.div key="empty" variants={fadeInUp} initial="hidden" animate="visible" className="mt-14 rounded-3xl bg-white border border-stone-100 p-16 text-center shadow-sm">
            <div className="text-4xl mb-4 grayscale opacity-30">☕📖</div>
            <h3 className="font-serif text-2xl mb-2">No books found in "{activeCategory}"</h3>
            <p className="text-stone-500">Try selecting a different category.</p>
          </motion.div>
        ) : (
          /* ⭐️ FIX 1: Added key={activeCategory} to force re-render on tab switch 
             ⭐️ FIX 2: Removed 'layout' prop from children to stop ghosting
          */
          <motion.div 
            key={activeCategory} 
            variants={staggerContainer} 
            initial="hidden" 
            animate="visible" 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((b) => (
                <motion.div 
                  key={b._id} 
                  variants={fadeInUp} 
                  // layout prop removed here to fix the invisible bug
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <BookCard book={b} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </main>
  );
}