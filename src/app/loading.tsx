export default function Loading() {
  return (
    <div className="min-h-screen bg-cream-bg">
      <div className="bg-teal-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto h-4 w-48 animate-pulse rounded-full bg-white/15" />
          <div className="mx-auto mt-6 h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-white/15" />
          <div className="mx-auto mt-4 h-4 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-3xl border border-cream-border bg-white">
            <div className="aspect-[16/10] animate-pulse bg-cream-surface" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-cream-border" />
              <div className="h-3 w-full animate-pulse rounded-full bg-cream-border" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-cream-border" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
