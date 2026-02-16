import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className='grid grid-cols-12 w-full place-items-center mt-5 gap-0 lg:gap-4'>
      {/* Left side - share buttons */}
      <div className='hidden lg:flex h-full w-full col-span-2 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Skeleton className='h-4 w-12' />
          <Skeleton className='h-10 w-10 rounded-full' />
          <Skeleton className='h-10 w-10 rounded-full' />
        </div>
      </div>

      {/* Center content */}
      <div className="col-span-12 lg:col-span-8 mx-auto flex flex-col gap-6 lg:gap-10 w-full">
        {/* Breadcrumb mobile */}
        <div className='block lg:hidden mt-6'>
          <Skeleton className='h-4 w-48' />
        </div>

        {/* Date */}
        <Skeleton className='h-4 w-40 self-center' />

        {/* Title */}
        <div className='flex flex-col items-center gap-2'>
          <Skeleton className='h-10 lg:h-14 w-3/4' />
          <Skeleton className='h-10 lg:h-14 w-1/2' />
        </div>

        {/* Author */}
        <div className='flex items-center gap-3 self-center -mt-4'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='flex flex-col gap-1'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-3 w-24' />
          </div>
        </div>

        {/* Breadcrumb desktop */}
        <div className='hidden lg:block'>
          <Skeleton className='h-4 w-64' />
        </div>

        {/* Content paragraphs */}
        <div className='flex flex-col gap-6'>
          {/* Paragraph 1 */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>

          {/* Heading */}
          <Skeleton className='h-7 w-64' />

          {/* Paragraph 2 */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
            <Skeleton className='h-4 w-full' />
          </div>

          {/* Heading */}
          <Skeleton className='h-7 w-48' />

          {/* Paragraph 3 */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-3/4' />
          </div>

          {/* Heading */}
          <Skeleton className='h-7 w-56' />

          {/* Paragraph 4 */}
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>
        </div>

        {/* Dot separator */}
        <div className="flex items-center justify-center self-center gap-4 my-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='h-2 w-2 rounded-full' />
          ))}
        </div>

        {/* Tags */}
        <div className='flex items-center gap-2'>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className='h-8 w-24 rounded' />
          ))}
        </div>
      </div>

      {/* Right side spacer */}
      <div className='hidden lg:block col-span-2' />
    </div>
  )
}
