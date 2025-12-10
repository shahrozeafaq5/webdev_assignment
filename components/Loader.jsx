export default function Loader() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse mt-8">

      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-3">

          {/* Skeleton Book Cover */}
          <div className="aspect-[2/3] bg-stone-200 rounded-lg" />

          {/* Skeleton Title */}
          <div className="h-4 bg-stone-200 rounded w-3/4" />

          {/* Skeleton Author */}
          <div className="h-3 bg-stone-200 rounded w-1/2" />

          {/* Skeleton Category */}
          <div className="h-3 bg-stone-200 rounded w-1/4 mt-2" />
        </div>
      ))}

    </div>
  );
}
