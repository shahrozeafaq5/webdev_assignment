"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data to simulate a populated cart
const INITIAL_ITEMS = [
  {
    _id: "demo-1",
    title: "Metamorphosis",
    author: "Franz kafka",
    category: "Self-help",
    cover: "kafka.png",
    quantity: 1,
  },
  {
    _id: "demo-3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    price:1799,
    cover: "/silent.png",
    quantity: 1,
  },
];

const CONTAINER_CLASSES = "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20";

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 3000 ? 0 : 250; // Free shipping over 3000
  const total = subtotal + shipping;

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917] selection:bg-[#1c1917] selection:text-[#FDFBF7]">
      
      {/* 0. TEXTURE OVERLAY (Consistent with Home) */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-multiply" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />

      {/* 1. NAV (Simplified for Cart) */}
      <nav className={`h-24 flex items-center justify-between ${CONTAINER_CLASSES}`}>
        <Link href="/" className="text-xl font-serif font-bold tracking-tighter">
          LIBRARIAN.
        </Link>
        <Link href="/" className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-black transition">
          Continue Shopping
        </Link>
      </nav>

      {/* 2. PAGE CONTENT */}
      <section className={`py-12 md:py-20 ${CONTAINER_CLASSES}`}>
        
        <h1 className="font-serif text-5xl md:text-6xl mb-16">
          Your Selection <span className="text-stone-300 ml-2 text-3xl align-top font-sans font-normal">({items.length})</span>
        </h1>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
            {/* LEFT: Cart Items List */}
            <div className="w-full lg:w-2/3">
              <div className="border-t border-stone-200">
                {items.map((item) => (
                  <div key={item._id} className="group py-8 border-b border-stone-200 flex gap-6 md:gap-10">
                    
                    {/* Image */}
                    <div className="relative w-24 md:w-32 aspect-[2/3] bg-stone-100 flex-shrink-0">
                      <img 
                        src={item.cover} 
                        alt={item.title} 
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl md:text-2xl leading-tight">{item.title}</h3>
                        <p className="font-serif text-lg">Rs {item.price.toLocaleString()}</p>
                      </div>
                      
                      <p className="text-stone-500 text-sm mb-auto">by {item.author}</p>

                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center gap-6">
                           <div className="text-xs font-bold uppercase tracking-widest text-stone-400">Qty: {item.quantity}</div>
                           <button 
                             onClick={() => removeItem(item._id)}
                             className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-red-600 transition-colors underline underline-offset-4 decoration-stone-200 hover:decoration-red-200"
                           >
                             Remove
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Summary & Checkout */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-12 bg-white border border-stone-100 p-8 shadow-sm">
                <h3 className="font-serif text-2xl mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-8 text-sm text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-black">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Estimate</span>
                    <span>{shipping === 0 ? "Free" : `Rs ${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Total</span>
                    <span className="font-serif text-3xl">Rs {total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-[#1c1917] text-[#FDFBF7] py-4 rounded-full font-medium tracking-wide hover:bg-stone-800 transition-all duration-300 active:scale-95 mb-4">
                  Proceed to Checkout
                </button>

                <p className="text-xs text-center text-stone-400 leading-relaxed">
                  Secure checkout powered by Stripe. <br/>
                  Free shipping on orders over Rs 3,000.
                </p>
              </div>
            </div>

          </div>
        )}

      </section>
    </main>
  );
}

// --- SUB-COMPONENT: Empty State ---
function EmptyState() {
  return (
    <div className="py-20 border-t border-stone-200 flex flex-col items-center justify-center text-center">
      <div className="text-6xl mb-6 grayscale opacity-20">📚</div>
      <h2 className="font-serif text-3xl mb-4">Your bag is empty</h2>
      <p className="text-stone-500 mb-8 max-w-md">
        Looks like you haven't found your next story yet. 
        Our collection is waiting for you.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-[#1c1917] text-white rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform"
      >
        Browse Collection
      </Link>
    </div>
  );
}