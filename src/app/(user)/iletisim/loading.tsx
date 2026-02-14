import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Hero Section Skeleton */}
      <div className="text-center mt-10 mb-12">
        <Skeleton className="h-12 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-[600px] mx-auto" />
      </div>

      {/* Contact Form + Info Section Skeleton */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Form Skeleton */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        {/* Contact Info Cards Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* FAQ Section Skeleton */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-96 mx-auto mb-3" />
          <Skeleton className="h-5 w-[600px] mx-auto" />
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CTA Section Skeleton */}
      <Skeleton className="h-64 w-full rounded-lg mb-12" />
    </div>
  )
}
