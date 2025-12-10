"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // 1. Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("paperhaven_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // 2. Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem("paperhaven_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 3. Toggle Favorite (Add or Remove)
  const toggleFavorite = (book) => {
    setFavorites((prev) => {
      const isExists = prev.find((item) => item._id === book._id);
      if (isExists) {
        // Remove if already exists
        return prev.filter((item) => item._id !== book._id);
      }
      // Add if new
      return [...prev, book];
    });
  };

  // 4. Check if a book is a favorite
  const isFavorite = (id) => {
    return favorites.some((item) => item._id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}