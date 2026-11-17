export default function ShopLoading() {
  return (
    <div className="surface-grid min-h-screen bg-cream-bg pb-12 sm:pb-20">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-teal-deep">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="h-4 w-48 animate-pulse rounded-full bg-white/15" />
          <div className="mt-5 h-12 w-3/4 max-w-2xl animate-pulse rounded-2xl bg-white/15" />
          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded-full bg-white/10" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="mb-8 h-16 animate-pulse rounded-3xl border border-cream-border bg-white" />
        <div className="mb-10 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 shrink-0 animate-pulse rounded-xl bg-cream-border/70" />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl border border-cream-border bg-white shadow-xs">
              <div className="h-60 w-full animate-pulse bg-cream-surface" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-1/3 animate-pulse rounded-full bg-cream-border" />
                <div className="h-5 w-3/4 animate-pulse rounded-full bg-cream-border" />
                <div className="h-6 w-1/2 animate-pulse rounded-full bg-cream-border" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
