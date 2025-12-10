import dbConnect from '@/lib/db';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

const booksToInsert = [
  // --- 🌟 EDITOR'S PICKS (First 4) ---
  {
    title: "Metamorphosis",
    author: "Franz Kafka",
    category: "Self-help",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780553213690-L.jpg",
    price: 1999,
    description: "Tiny changes, remarkable results. A cozy, practical book for building better habits without burning out.",
  },
  {
    title: "White Nights",
    author: "Fyodor Dostoevsky",
    category: "Fiction", 
    coverImage: "https://covers.openlibrary.org/b/isbn/9780486469683-L.jpg",
    price: 1199,
    description: "A sentimental story from the diary of a dreamer. A short story of loneliness and unrequited love.",
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    price: 1799,
    description: "A tense, clever thriller with a calm aesthetic cover and chaos inside. You’ll finish it fast.",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    price: 1799,
    description: "A modern classic about following your dreams and listening to your heart.",
  },

  // --- REST OF THE LIBRARY ---
  {
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-help",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    price: 2100,
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
  },
  {
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
    price: 1200,
    description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
    price: 1100,
    description: "The exemplary novel of the Jazz Age that has been acclaimed by generations of readers.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
    price: 999,
    description: "It is a truth universally acknowledged... The classic tale of love, reputation, and class.",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
    price: 2400,
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    category: "Fiction",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780316769480-L.jpg",
    price: 1350,
    description: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield.",
  },
  {
    title: "The Subtle Art",
    author: "Mark Manson",
    category: "Self-help",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    price: 1300,
    description: "A counterintuitive approach to living a good life. Stop trying to be 'positive' all the time.",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Self-help",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    price: 1450,
    description: "What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not!",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Self-help",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    price: 2200,
    description: "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution.",
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    category: "Thriller",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg",
    price: 1450,
    description: "Marriage can be a real killer. One of the most addictive thrillers of the last decade.",
  },
  {
    title: "The Girl on the Train",
    author: "Paula Hawkins",
    category: "Thriller",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781594634024-L.jpg",
    price: 1250,
    description: "The debut psychological thriller that will forever change the way you look at other people's lives.",
  },
  {
    title: "Verity",
    author: "Colleen Hoover",
    category: "Thriller",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781791392796-L.jpg",
    price: 1550,
    description: "Whose truth is the lie? A dark, twisted romance that will keep you up all night.",
  },
  {
    title: "Ikigai",
    author: "Héctor García",
    category: "Lifestyle",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    price: 1650,
    description: "The Japanese Secret to a Long and Happy Life. Bring meaning and joy to all your days.",
  },
  {
    title: "The Life-Changing Magic",
    author: "Marie Kondo",
    category: "Lifestyle",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781607747307-L.jpg",
    price: 1550,
    description: "Transform your home into a permanently clear and clutter-free space with the KonMari Method.",
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Lifestyle",
    coverImage: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    price: 1800,
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know.",
  },
  {
    title: "Think Like a Monk",
    author: "Jay Shetty",
    category: "Lifestyle",
    coverImage: "https://covers.openlibrary.org/b/isbn/9781982134488-L.jpg",
    price: 1600,
    description: "Train your mind for peace and purpose every day.",
  }
];

export async function GET() {
  try {
    await dbConnect();
    await Book.deleteMany({}); 
    await Book.insertMany(booksToInsert);

    return NextResponse.json({ 
        success: true, 
        message: "Database refreshed! Editor's picks restored to the top." 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}