"use client";
import Link from "next/link";

export default function CategoryPills({ categories, active }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-10">
      <Link
        href="/books"
        className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
          !active
            ? "bg-[#18181B] text-white border-[#18181B]"
            : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
        }`}
      >
        All
      </Link>

      {categories.map((cat) => (
        <Link
          key={cat}
          href={`/books?cat=${cat}`}
          className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
            active === cat
              ? "bg-[#18181B] text-white border-[#18181B]"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
          }`}
        >
          {cat}
        </Link>
      ))}
    </div>
  );
}