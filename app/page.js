"use client";

import { useEffect } from "react";
import Link from "next/link";

const demoBooks = [
  {
    _id: "demo-1",
    title: "Metamorphosis",
    author: "Franz kafka",
    category: "Self-help",
    cover: "kafka.png",
  },
  {
    _id: "demo-2",
    title: "White nights",
    author: "Fyoder Dostoyevsky",
    category: "Lifestyle",
    cover: "/white.png",
  },
  {
    _id: "demo-3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    cover: "/silent.png",
  },
  {
    _id: "demo-4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
  },
];

export default function Home() {
  const featured = demoBooks;

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917]">

      {/* Animations */}
      <style>{`
        @keyframes fadeUpScroll {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .reveal-on-scroll { opacity: 0; transform: translateY(40px); }
        .fade-visible { animation: fadeUpScroll 1s ease-out forwards; }

        @keyframes slowFade {
          0% { opacity: 0; }
          100% { opacity: 0.01; }
        }
        .bg-fade { animation: slowFade 3s ease-out forwards; }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.1s ease-out forwards; }
      `}</style>

      {/* HERO SECTION */}
<section className="relative border-b border-stone-200">
  <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-16 pb-12 md:pb-20">
    
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <span className="h-px w-10 bg-[#1c1917]"></span>
        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-stone-500">
          Est. 2025
        </span>
      </div>

      <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1] tracking-tight mb-6 sm:mb-8">
        The Curated <br />
        <span className="italic text-stone-400">Bookshelf.</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-stone-600 leading-relaxed max-w-md mb-8">
        A digital sanctuary for the thoughtful reader. 
        Minimalist design, premium selection, and stories that matter.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/books"
          className="px-6 py-3 rounded-full bg-[#1c1917] text-[#FDFBF7] text-sm sm:text-base hover:scale-105 transition duration-200"
        >
          Browse Collection
        </Link>
        <Link
          href="/about"
          className="px-6 py-3 rounded-full border border-stone-300 text-sm sm:text-base hover:border-[#1c1917]"
        >
          Our Story
        </Link>
      </div>
    </div>

  </div>

  <div className="absolute bottom-0 right-0 transform translate-y-12 opacity-[0.03] hidden sm:block">
    <span className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-serif">
      READING
    </span>
  </div>
</section>


      {/* FEATURED SECTION */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 reveal-on-scroll">

        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-3">Editor's Picks</h2>
            <p className="text-stone-500">Selected for their impact and beauty.</p>
          </div>

          <Link 
            href="/books" 
            className="hidden md:inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase hover:underline underline-offset-4"
          >
            View Archive →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featured.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
          <Link 
            href="/books" 
            className="inline-block border-b border-black pb-1 text-sm font-bold uppercase tracking-widest">
            View Archive
          </Link>
        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#1c1917] text-[#FDFBF7] py-24 px-6 reveal-on-scroll">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl mb-6">Join the inner circle.</h3>
          <p className="text-stone-400 mb-8 font-light">
            Receive a weekly curation of books, essays, and quiet thoughts.
          </p>
          <div className="flex gap-2 p-1 bg-white/10 rounded-full backdrop-blur-sm max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none outline-none text-white placeholder-stone-400 px-6 py-3 w-full"
            />
            <button className="bg-[#FDFBF7] text-[#1c1917] px-6 py-3 rounded-full text-sm font-bold hover:bg-stone-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}

/* BOOK CARD COMPONENT */
function BookCard({ book }) {
  return (
    <Link href={`/books/${book._id}`} className="group block cursor-pointer reveal-on-scroll">
      <div className="relative aspect-[2/3] mb-6 overflow-hidden bg-stone-200 shadow-sm transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2">
        <img
          src={book.cover}
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
        <p className="text-xs font-bold tracking-widest uppercase text-stone-400 mt-2">{book.category}</p>
      </div>
    </Link>
  );
}
