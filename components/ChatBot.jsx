"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm the PaperHaven curator. What kind of books are you looking for today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Auto-scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // 2. Call API
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();

      // 3. Add Bot Response
      setMessages(prev => [...prev, data]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: "I'm having trouble connecting to the library." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* --- TOGGLE BUTTON (Floating) --- */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1c1917] text-[#FDFBF7] rounded-full shadow-xl flex items-center justify-center text-2xl border-2 border-[#FDFBF7]"
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>

      {/* --- CHAT WINDOW --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1c1917] p-4 text-[#FDFBF7]">
              <h3 className="font-serif text-lg">Curator Bot</h3>
              <p className="text-xs text-stone-400">Ask me for recommendations!</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFBF7]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#1c1917] text-white rounded-tr-none' 
                      : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Suggestion Cards (if any) */}
                  {msg.books && (
                    <div className="mt-3 space-y-2 w-full">
                      {msg.books.map(book => (
                        <Link href={`/books/${book._id}`} key={book._id} className="flex gap-3 p-2 bg-white border border-stone-100 rounded-lg hover:shadow-md transition group">
                          <img src={book.coverImage || book.cover} className="w-10 h-14 object-cover rounded-sm" alt="" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate group-hover:underline">{book.title}</p>
                            <p className="text-[10px] text-stone-500 truncate">{book.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && <div className="text-xs text-stone-400 animate-pulse ml-2">Curator is typing...</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-100 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'thriller' or 'fiction'..."
                className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#1c1917]"
              />
              <button type="submit" className="w-8 h-8 bg-[#1c1917] text-white rounded-full flex items-center justify-center hover:bg-stone-700">
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}