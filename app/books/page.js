import BookCard from "../../components/BookCard";

const demoBooks = [
  {
    _id: "demo-1",
    title: "Metamorphosis",
    author: "Franz kafka",
    category: "Self-help",
    cover: "kafka.png",
  },
  {
    _id: "demo-2",
    title: "White nights",
    author: "Fyoder Dostoyevsky",
    category: "Lifestyle",
    cover: "/white.png",
  },
  {
    _id: "demo-3",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    category: "Thriller",
    cover: "/silent.png",
  },
  {
    _id: "demo-4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    cover: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
  },
];

export default function BooksPage() {
  const books = demoBooks;

  return (
    <main >
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">

        <div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Books</h1>
          <p className="mt-2 text-cocoa">Warm, cute, clean. Just vibes.</p>
        </div>

        <div className="w-full md:w-[420px]">
          <div className="bg-white border border-black/10 rounded-2xl px-4 py-3 shadow-soft">
            <input
              className="w-full outline-none bg-transparent text-sm"
              placeholder="Search (we’ll wire it later)…"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["All", "Fiction", "Self-help", "Thriller", "Lifestyle"].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-full text-sm border border-black/10 bg-white hover:shadow-soft transition ${
              t === "All" ? "bg-black text-white" : "text-cocoa"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {books.length === 0 ? (
        <div className="mt-14 rounded-3xl bg-white border border-black/10 p-10 text-center shadow-soft">
          <div className="text-4xl">☕📖</div>
          <h3 className="mt-3 text-xl font-semibold">No books yet</h3>
          <p className="mt-2 text-cocoa">Add some books and this grid will shine.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((b) => (
            <BookCard key={b._id} book={b} />
          ))}
        </div>
      )}
    </main>
  );
}
