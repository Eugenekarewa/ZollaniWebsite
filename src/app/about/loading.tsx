export default function AboutLoading() {
  return (
    <div className="bg-cream-bg min-h-screen">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-teal-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="h-4 w-40 animate-pulse rounded-full bg-white/15" />
          <div className="mt-5 h-12 w-3/4 max-w-2xl animate-pulse rounded-2xl bg-white/15" />
          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-3xl border border-cream-border bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="aspect-square w-full animate-pulse rounded-2xl bg-cream-surface" />
          <div className="space-y-3">
            <div className="h-3 w-1/3 animate-pulse rounded-full bg-cream-border" />
            <div className="h-6 w-2/3 animate-pulse rounded-full bg-cream-border" />
            <div className="h-4 w-full animate-pulse rounded-full bg-cream-border" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-cream-border" />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-cream-border bg-white shadow-sm">
              <div className="aspect-[4/3] w-full animate-pulse bg-cream-surface" />
              <div className="space-y-2 p-6">
                <div className="h-3 w-1/3 animate-pulse rounded-full bg-cream-border" />
                <div className="h-5 w-2/3 animate-pulse rounded-full bg-cream-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
