import { notFound } from 'next/navigation';
import BookDetailsClient from '@/components/BookDetailsClient';

async function getBook(id) {
  const res = await fetch(`http://localhost:3000/api/books/${id}`, {
    cache: 'no-store', 
  });

  if (res.status === 404) {
    notFound(); 
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch book data with status: ${res.status}`);
  }

  const result = await res.json();
  return result.data; 
}

export default async function BookPage({ params }) {
  

  const bookId = (await params).id;

  try {
    const book = await getBook(bookId);
    
    return (
      <BookDetailsClient book={book} />
    );

  } catch (error) {
    console.error("Error fetching single book:", error);

    return <div className="p-8 text-center text-red-600">Error loading book details: {error.message}</div>;
  }
}