import dbConnect from '@/lib/db';
import Book from '@/models/Book';
import { NextResponse } from 'next/server';

// GET: Fetch all books
export async function GET() {
  try {
    await dbConnect();
    const books = await Book.find({}); // Find all books
    return NextResponse.json({ success: true, data: books });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

// POST: Add a new book
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json(); // Get data sent from frontend
    const book = await Book.create(body); // Create new book in DB
    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}