import Link from "next/link";

const CONTAINER_CLASSES = "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917]">
      
      {/* Hero Section */}
      <section className={`pt-24 pb-20 md:pt-32 md:pb-32 ${CONTAINER_CLASSES}`}>
        <div className="max-w-4xl">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-stone-500 mb-6 block">
            Since 2025
          </span>
          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] tracking-tight mb-10">
            We believe in <br />
            <span className="italic text-stone-400">slow reading.</span>
          </h1>
        </div>
      </section>

      {/* Image Banner */}
      <section className="w-full h-[60vh] md:h-[80vh] overflow-hidden relative mb-24">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1507842217153-e21220c521da?q=80&w=2070&auto=format&fit=crop" 
          alt="Library Interior" 
          className="w-full h-full object-cover"
        />
      </section>

      {/* Story Content */}
      <section className={`pb-32 ${CONTAINER_CLASSES}`}>
        <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          
          <div className="md:w-1/3">
            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
              A digital sanctuary for the modern mind.
            </h2>
            <div className="w-12 h-[1px] bg-[#1c1917] mb-6" />
          </div>

          <div className="md:w-2/3 space-y-8 text-lg md:text-xl text-stone-600 leading-relaxed font-serif">
            <p>
              In an age of infinite scrolling and instant gratification, LIBRARIAN. was born 
              out of a desire to slow down. We curate books not based on algorithms, 
              but on their ability to make us pause, think, and feel.
            </p>
            <p>
              Our collection is intentionally small. We don't sell everything; we sell 
              the books that matter. Every title on our digital shelf has been read, 
              vetted, and loved by a human being.
            </p>
            <p>
              We are not just a bookstore. We are a quiet corner of the internet 
              dedicated to the timeless art of turning the page.
            </p>

            <div className="pt-8">
              <Link 
                href="/books" 
                className="inline-block border-b border-black pb-1 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition"
              >
                View the Collection
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}