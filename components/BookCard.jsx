import Link from "next/link";

export default function BookCard({ book }) {
  return (
    <Link href={`/books/${book._id}`} className="group block cursor-pointer">
      <div className="relative aspect-[2/3] w-full mb-6 overflow-hidden bg-stone-100">
        
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03)] z-10 pointer-events-none" />
        
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/5" />
      </div>

      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-serif text-xl leading-snug group-hover:underline underline-offset-4 decoration-stone-300 transition-all">
            {book.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1">{book.author}</p>
        </div>
        
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 border border-stone-200 px-2 py-1 rounded-sm">
          {book.category.slice(0, 4)}
        </span>
      </div>
    </Link>
  );
}