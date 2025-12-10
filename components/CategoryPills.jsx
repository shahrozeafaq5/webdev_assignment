"use client";

export default function CategoryPills({ categories, active, onSelect }) {
  // Ensure "All" is always the first option
  // We filter it out from the incoming list just in case it's duplicated
  const displayCategories = ["All", ...categories.filter(c => c !== "All")];

  return (
    <div className="flex flex-wrap justify-center gap-2 my-10">
      {displayCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)} // 👈 Call the parent function
          className={`px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
            active === cat
              ? "bg-[#18181B] text-white border-[#18181B]"
              : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}