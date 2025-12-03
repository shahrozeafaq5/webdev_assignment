import Link from "next/link";

const demoBooks = [
  {
    _id: "demo-1",
    title: "Metamorphosis",
    author: "Franz kafka",
    category: "Self-help",
    cover: "kafka.png",
    description: "Tiny changes, remarkable results. A cozy, practical book for building better habits without burning out.",
    price: 1999,
  },
  {
    _id: "demo-2",
    title: "White nights",
    author: "Fyoder Dostoyevsky",
    category: "Lifestyle",
    cover: "/white.png",
    description: "A warm guide to finding purpose through simplicity, balance, and joyful routines.",
    price: 1499,
  },
  {
    _id: "demo-3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    cover: "/silent.png",
    description: "A tense, clever thriller with a calm aesthetic cover and chaos inside. You’ll finish it fast.",
    price: 1799,
  },
];

export default async function BookDetails(props) {
  const params = await props.params;
  const id = params?.id;
  const book = demoBooks.find((b) => b._id === id);

  if (!book) return <div className="p-20 text-center font-serif text-2xl">Book unavailable.</div>;

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      

      <div className="flex flex-col lg:flex-row min-h-screen items-stretch">
        
        <section className="relative w-full lg:w-[45%] bg-[#101010] text-white flex flex-col items-center justify-center p-12 overflow-hidden">
          

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800/40 via-[#101010] to-[#101010]" />

          <Link href="/books" className="absolute top-8 left-8 z-10 text-xs font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors">
             &larr; Back
          </Link>

          <div className="relative z-10">
 
            <div className="relative group">
              <div className="absolute -inset-1 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={book.cover}
                alt={book.title}
                className="relative w-64 md:w-80 shadow-2xl shadow-black rounded-sm transform transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="relative z-10 mt-12 opacity-40 text-[10px] tracking-[0.3em] uppercase">
            Special Edition
          </div>
        </section>

        <section className="w-full lg:w-[55%] flex flex-col justify-center bg-[#FDFBF7] p-8 md:p-20 lg:p-24">
          
          <div className="max-w-xl mx-auto w-full">
            {/* Category Tag */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-stone-300"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-stone-400">
                {book.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-7xl text-[#1c1917] leading-[1.1] mb-4">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-stone-500 font-medium italic mb-10 text-lg">
              by {book.author}
            </p>

            {/* Description */}
            <div className="prose prose-lg prose-stone leading-relaxed text-stone-600 mb-12">
              <p>{book.description}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-stone-200 mb-10" />

            {/* Price & Cart Action */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8">
              
              <div>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-2">Total</p>
                <div className="font-serif text-4xl text-[#1c1917]">
                  Rs {book.price.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-4 w-full xl:w-auto">
                <button className="flex-1 xl:flex-none bg-[#1c1917] text-[#FDFBF7] h-14 px-10 rounded-full font-medium tracking-wide hover:bg-stone-800 transition-all duration-300 shadow-xl shadow-stone-200 active:scale-95">
                  Add to Cart
                </button>
                <button className="h-14 w-14 flex items-center justify-center rounded-full border border-stone-200 text-stone-400 hover:border-[#1c1917] hover:text-red-600 transition-colors duration-300">
                  ♥
                </button>
              </div>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}