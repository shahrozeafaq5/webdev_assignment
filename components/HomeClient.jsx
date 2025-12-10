"use client";

import Link from "next/link";
import SearchBar from "./SearchBar"; 
import { motion } from "framer-motion";

// --- ANIMATION VARIANTS (Moved here) ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

function BookCard({ book }) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={`/books/${book._id}`} className="group block cursor-pointer">
        <div className="relative aspect-[2/3] mb-6 overflow-hidden bg-stone-200 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2">
          <img
            src={book.coverImage || book.cover} 
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
        </div>
        <div className="space-y-1">
          <h3 className="font-serif text-xl leading-tight group-hover:underline decoration-stone-300 underline-offset-4 decoration-1 transition-all">
            {book.title}
          </h3>
          <p className="text-sm text-stone-500 font-medium">{book.author}</p>
          <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mt-2">
            {book.category}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// Accepts 'books' as a prop from the server
export default function HomeClient({ books }) {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917]"> 
      
      {/* HERO SECTION */}
      <section className="relative border-b border-stone-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-16 pb-12 md:pb-20">
          <div className="max-w-3xl">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="h-px w-10 bg-[#1c1917]"></span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-stone-500">
                  Est. 2025
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tight mb-6 sm:mb-8">
                The Curated <br />
                <span className="italic text-stone-400">Bookshelf.</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed max-w-md mb-8">
                A digital sanctuary for the thoughtful reader. Minimalist design, premium selection, and stories that matter.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <Link href="/books" className="px-6 py-3 rounded-full bg-[#1c1917] text-[#FDFBF7] text-sm sm:text-base hover:scale-105 transition duration-200">
                  Browse Collection
                </Link>
                <Link href="/about" className="px-6 py-3 rounded-full border border-stone-300 text-sm sm:text-base hover:border-[#1c1917] transition-colors">
                  Our Story
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Background Text */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.03, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-0 right-0 transform translate-y-12 hidden sm:block pointer-events-none"
        >
          <span className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-serif leading-none">
            READING
          </span>
        </motion.div>
      </section>

      {/* FEATURED SECTION */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16"
        >
          <SearchBar />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-3">Editor's Picks</h2>
            <p className="text-stone-500">Selected for their impact and beauty.</p>
          </div>
          <Link href="/books" className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:underline underline-offset-4">
            View Archive →
          </Link>
        </motion.div>

        {/* STAGGERED GRID */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          {books.map((b) => (
             <BookCard key={b._id} book={b} />
          ))}
        </motion.div>

        <div className="mt-16 text-center md:hidden">
          <Link href="/books" className="inline-block border-b border-black pb-1 text-sm font-bold uppercase tracking-widest">
            View Archive
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-[#1c1917] text-[#FDFBF7] py-24 px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl mb-6">Join the inner circle.</h3>
          <p className="text-stone-400 mb-8 font-light">
            Receive a weekly curation of books, essays, and quiet thoughts.
          </p>
          <div className="flex gap-2 p-1 bg-white/10 rounded-full backdrop-blur-sm max-w-md mx-auto">
            <input type="email" placeholder="Email address" className="bg-transparent border-none outline-none text-white placeholder-stone-400 px-6 py-3 w-full" />
            <button className="bg-[#FDFBF7] text-[#1c1917] px-6 py-3 rounded-full text-sm font-bold hover:bg-stone-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </motion.section>
    </main>
  );
}