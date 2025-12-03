"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#1c1917] px-6 py-20">

      <h1 className="font-serif text-5xl mb-10">Your Favourites ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-stone-500">You haven't added any favourite books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {favorites.map((book) => (
            <Link key={book._id} href={`/books/${book._id}`} className="block">
              <div className="aspect-[2/3] overflow-hidden bg-stone-200 shadow">
                <img
                  src={book.cover}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif text-xl mt-3">{book.title}</h3>
              <p className="text-sm text-stone-500">{book.author}</p>
            </Link>
          ))}
        </div>
      )}

    </main>
  );
}
