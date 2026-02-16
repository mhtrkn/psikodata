import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="col-span-12">
      {/* Hero Section */}
      <section className="relative col-span-12 w-full overflow-hidden">
        <div className="relative flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-48 rounded-full mb-6" />
          <Skeleton className="h-16 sm:h-20 md:h-24 w-72 sm:w-96 mb-6 rounded-lg" />
          <Skeleton className="h-6 w-64 mb-6 rounded" />
          <Skeleton className="h-12 w-full max-w-2xl mb-10 rounded" />

          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-44 rounded-md" />
            <Skeleton className="h-12 w-36 rounded-md" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-10 w-24 mb-2 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      <div className="mt-8 mb-12">
        <section className="col-span-12 mb-20 w-full">
          <div className="grid md:grid-cols-2 gap-0">
            <Skeleton className="h-64 md:h-full min-h-[400px] rounded-3xl" />
            <div className="flex flex-col justify-between p-8 lg:p-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
                <Skeleton className="h-8 lg:h-10 w-full mb-4 rounded" />
                <Skeleton className="h-24 w-full rounded" />
              </div>
              <Skeleton className="h-5 w-32 mt-6 rounded" />
            </div>
          </div>
        </section>
      </div>

      {/* Blog Container */}
      <section className="col-span-12 grid grid-cols-12 gap-4 lg:gap-12">
        {/* Blog List */}
        <div className="col-span-12 lg:col-span-9">
          <Skeleton className="h-8 w-64 mb-4 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Sidebar */}
        <aside className="hidden lg:flex flex-col gap-10 lg:col-span-3">
          {Array.from({ length: 2 }).map((_, sectionIdx) => (
            <div key={sectionIdx}>
              <Skeleton className="h-7 w-32 mb-4 rounded" />
              <div className="grid grid-cols-1 gap-3 mt-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-16 rounded-full" />
                      <Skeleton className="h-5 w-full rounded" />
                      <Skeleton className="h-3 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </aside>
      </section>
    </div>
  )
}
