import dbConnect from '@/lib/db';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

// ⚠️ DO NOT USE 'export default' HERE. ONLY NAMED EXPORTS.

export async function GET(request, { params }) {
  // Await params to access the 'id' property correctly
  const { id } = await params;

  try {
    await dbConnect();

    // 1. Find the book by ID
    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
    }
    
    // 2. Return the found book
    return NextResponse.json({ success: true, data: book }, { status: 200 });

  } catch (error) {
    // If the ID format is invalid (not a valid MongoDB ObjectId)
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}