import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-16 mt-10">
        <Skeleton className="h-12 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-[600px] mx-auto" />
      </div>

      <div className="space-y-4 mb-12">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      <div className="mb-12">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <Skeleton className="h-px w-full my-12" />

      <div className="mb-12">
        <Skeleton className="h-8 w-48 mx-auto mb-6" />
        <div className="grid md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>

      <Skeleton className="h-64 w-full rounded-lg mb-12" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  )
}
