import dbConnect from '@/lib/db';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();
    const { message } = await request.json();
    const lowerMsg = message.toLowerCase();

    // 1. Keyword Mapping (Simple AI)
    let filter = {};
    let responseText = "";

    if (lowerMsg.includes("fiction") || lowerMsg.includes("story")) {
      filter = { category: "Fiction" };
      responseText = "I love fiction! Here are some top picks:";
    } else if (lowerMsg.includes("thriller") || lowerMsg.includes("mystery") || lowerMsg.includes("scary")) {
      filter = { category: "Thriller" };
      responseText = "Ooh, looking for some suspense? Check these out:";
    } else if (lowerMsg.includes("self") || lowerMsg.includes("help") || lowerMsg.includes("improve")) {
      filter = { category: "Self-help" };
      responseText = "Growth is beautiful. Here are books for your journey:";
    } else if (lowerMsg.includes("life") || lowerMsg.includes("style") || lowerMsg.includes("calm")) {
      filter = { category: "Lifestyle" };
      responseText = "For a balanced life, I recommend these:";
    } else {
      // ⭐️ FIX: Updated Default / Fallback Message ⭐️
      const availableCategories = "Fiction, Thriller, Self-help, or Lifestyle";
      
      return NextResponse.json({ 
        role: 'bot', 
        content: `I'm your library assistant. Tell me what you're interested in! I can suggest books in categories like: ${availableCategories}.` 
      });
    }

    // 2. Query Database based on keywords
    const books = await Book.find(filter).limit(3);

    if (books.length === 0) {
      return NextResponse.json({ role: 'bot', content: "I couldn't find any specific books for that right now, but our library is growing!" });
    }

    // 3. Format the response
    return NextResponse.json({ 
      role: 'bot', 
      content: responseText,
      books: books // Send book data to display cards in chat
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ role: 'bot', content: "Sorry, I lost my train of thought. Try again?" });
  }
}