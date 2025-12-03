import Link from "next/link";

// Shared container classes
const CONTAINER_CLASSES = "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10";

export default function AboutPage() {
  return (
    // Added a relative position here to contain the texture overlay
    <main className="min-h-screen bg-[#FDFBF7] text-[#292524] relative overflow-hidden">
      
      {/* --- DECORATIVE: Subtle Grain Texture Overlay --- */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <section className={`pt-28 pb-24 md:pt-40 md:pb-40 ${CONTAINER_CLASSES}`}>
        <div className="max-w-4xl relative">
          <div className="absolute -left-4 top-1 text-stone-300 text-4xl hidden md:block">
            ✻
          </div>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-stone-500 mb-8 block pl-2 md:pl-0">
            Est. 2025 • The Slow Movement
          </span>
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight mb-10 text-stone-900">
            We believe in the<br />
            <span className="italic font-light text-stone-400 relative inline-block">
              art
              <svg className="absolute top-full left-0 w-full h-2 text-stone-200/50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            </span> of <span className="italic text-stone-800">slow reading.</span>
          </h1>
        </div>
      </section>

      <section className="w-full h-[65vh] md:h-[85vh] overflow-hidden relative mb-32 group">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/10 via-stone-900/20 to-stone-900/40 z-10 transition-opacity group-hover:opacity-80" />
        
        <img 
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2228&auto=format&fit=crop" 
          alt="Sunlight streaming into a classic, cozy library with old books" 
          className="w-full h-full object-cover scale-105 transition-transform duration-[1.5s] group-hover:scale-100"
        />
      </section>

      <section className={`pb-40 ${CONTAINER_CLASSES}`}>
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          
          <div className="md:w-1/3 md:sticky md:top-32">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8 text-stone-800">
              A digital sanctuary for the modern mind.
            </h2>
            

            <div className="text-stone-300 text-2xl flex items-center gap-2 mb-6">
             <span className="h-[1px] w-12 bg-stone-300"></span> ◇ <span className="h-[1px] w-12 bg-stone-300"></span>
            </div>
          </div>

      
          <div className="md:w-2/3 space-y-10 text-lg md:text-xl text-stone-600 leading-relaxed font-serif">
            <p className="relative">              <span className="float-left text-7xl font-serif leading-[0.7] mr-4 mt-2 text-stone-800 italic">I</span>
              n an age of infinite scrolling and instant gratification, PaperHaven. was born 
              out of a desire to slow down. We curate books not based on algorithms, 
              but on their ability to make us pause, think, and feel.
            </p>
            <p>
              Our collection is intentionally small. We don't sell everything; we sell 
              the books that matter. Every title on our digital shelf has been read, 
              vetted, and loved by a human being.
            </p>
            <p className="text-xl md:text-2xl text-stone-800 italic font-light">
              "We are not just a bookstore. We are a quiet corner of the internet 
              dedicated to the timeless art of turning the page."
            </p>

            <div className="pt-12">
              <Link 
                href="/books" 
                className="group inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-stone-400 transition"
              >
                <span className="border-b border-black group-hover:border-stone-400 pb-1 transition-all">View the Collection</span>
                <span className="text-xl relative top-[-1px] transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}