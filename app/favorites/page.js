"use client";

import { useFavorites } from "@/context/FavoritesContext";
import BookCard from "@/components/BookCard";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <main className="min-h-screen bg-[#FDFBF7] pt-32 px-6 md:px-12 max-w-7xl mx-auto">
      <h1 className="font-serif text-4xl mb-12">Your Favorites ❤️</h1>
      
      {favorites.length === 0 ? (
        <p className="text-stone-500">You haven't liked any books yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {favorites.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}