import HomeClient from "@/components/HomeClient";

export const dynamic = 'force-dynamic';

async function getFeaturedBooks() {
  try {
    const res = await fetch('http://localhost:3000/api/books', { 
        cache: 'no-store' 
    });
    
    if (!res.ok) {
        return [];
    }
    const data = await res.json();
    return data.success ? data.data.slice(0, 4) : [];
  } catch (error) {
    console.error("Error fetching homepage books:", error);
    return [];
  }
}

export default async function Page() {
  const books = await getFeaturedBooks();
  
  return <HomeClient books={books} />;
}