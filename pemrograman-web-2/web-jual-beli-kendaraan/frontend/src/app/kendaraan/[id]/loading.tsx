export default function VehicleDetailLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="aspect-video w-full animate-pulse rounded-lg bg-zinc-200" />
        ))}
      </div>

      <div className="mt-6 h-7 w-2/3 animate-pulse rounded bg-zinc-200" />
      <div className="mt-3 h-7 w-1/3 animate-pulse rounded bg-zinc-200" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-zinc-100" />
      <div className="mt-6 h-24 w-full animate-pulse rounded-lg bg-zinc-100" />
    </div>
  );
}
