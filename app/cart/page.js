"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useState } from "react"; // 👈 Import useState

export default function CartPage() {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  
  // 1. New State for Checkout Process
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // 2. Mock Checkout Handler
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate API call delay (2 seconds)
    setTimeout(() => {
      clearCart(); // Clear the cart
      setIsCheckingOut(false);
      setOrderPlaced(true); // Show success screen
    }, 2000);
  };

  // 3. Success Screen View
  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FDFBF7] flex items-center justify-center text-center px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-serif text-4xl mb-4 text-[#1c1917]">Order Confirmed!</h1>
          <p className="text-stone-500 mb-8 text-lg">
            Thank you for your purchase. Your books are being prepared with care.
          </p>
          <Link 
            href="/books" 
            className="px-8 py-3 bg-[#1c1917] text-[#FDFBF7] rounded-full text-sm font-bold hover:scale-105 transition-transform inline-block"
          >
            Continue Reading
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 px-6 md:px-12 max-w-[1200px] mx-auto text-[#1c1917]">
      <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" className="font-serif text-4xl mb-12">Your Cart</motion.h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 border-t border-stone-200">
          <p className="text-stone-500 mb-6 text-lg">Your bag is currently empty.</p>
          <Link href="/books" className="px-8 py-3 bg-[#1c1917] text-[#FDFBF7] rounded-full text-sm font-bold">Start Browsing</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="md:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item._id}
                  layout
                  variants={fadeInUp}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex gap-6 border-b border-stone-200 pb-6"
                >
                  <div className="w-24 h-36 bg-stone-200 shrink-0 overflow-hidden rounded-sm">
                    <img src={item.coverImage || item.cover} alt={item.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-xl leading-tight">{item.title}</h3>
                        <p className="font-serif font-bold">Rs {item.price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-stone-500 mt-1">{item.author}</p>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="text-xs font-bold bg-stone-100 px-3 py-1 rounded-full text-stone-600">Qty: {item.quantity}</div>
                      
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <button onClick={clearCart} className="text-sm text-stone-400 hover:text-stone-800 underline underline-offset-4">Clear Shopping Bag</button>
          </motion.div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 sticky top-32">
              <h3 className="font-serif text-2xl mb-6">Summary</h3>
              <div className="border-t border-stone-200 pt-6 flex justify-between items-center font-serif text-xl mb-8">
                <span>Total</span>
                <span>Rs {totalPrice.toLocaleString()}</span>
              </div>
              
              {/* 4. Checkout Button with Loading State */}
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-[#1c1917] text-[#FDFBF7] font-bold tracking-widest uppercase rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </>
                ) : (
                  "Checkout"
                )}
              </button>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}