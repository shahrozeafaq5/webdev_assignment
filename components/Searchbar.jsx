"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Debounce helper
function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export default function SearchBar({ initialValue = "" }) {
  const [value, setValue] = useState(initialValue);
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  useEffect(() => setValue(initialValue), [initialValue]);

  const pushQuery = useMemo(
    () =>
      debounce((q) => {
        const params = new URLSearchParams(sp.toString());
        if (q) params.set("q", q);
        else params.delete("q");
        router.push(`${pathname}?${params.toString()}`);
      }, 300),
    [router, pathname, sp]
  );

  return (
    <div className="relative group w-full max-w-md mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          pushQuery(e.target.value.trim());
        }}
        placeholder="Search library..."
        className="w-full bg-white pl-10 pr-4 py-3 text-sm rounded-full border border-gray-200 outline-none transition-all placeholder:text-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
      />
    </div>
  );
}