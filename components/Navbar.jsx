import Link from "next/link";
<Link href="/favorites">Favourites ❤️</Link>

function CartIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.5 6.5h15l-1.5 8.5H8L6.5 6.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6.5 6 4.5H3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export default function Navbar() {
  const cartCount = 0; 

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-black/10 ">
      <div className="max-w-7xl mx-auto h-16 px-5 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-grid place-items-center h-9 w-9 rounded-xl bg-peach/60 border border-black/10">
            <img src="/logo.png" alt="" />
          </span>
          <span className="text-xl md:text-2xl font-semibold tracking-tight">
            PaperHaven
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[15px] text-cocoa">
          <Link className="hover:text-ink transition" href="/">Home</Link>
          <Link className="hover:text-ink transition" href="/books">Books</Link>
          <Link className="hover:text-ink transition" href="/about">About</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/books"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-white border border-black/10 text-sm hover:shadow-soft transition"
          >
            Browse
          </Link>

          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-black/10 hover:shadow-soft transition"
            aria-label="Cart"
          >
            <CartIcon />
            <span className="hidden sm:inline text-sm text-cocoa">Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 min-w-5 px-1 rounded-full bg-black text-white text-xs grid place-items-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
