import { Badge } from '@/components/ui/badge'
import { Card, CardFooter } from '@/components/ui/card'
import Link from 'next/link'

function BlogCard({ title, description, badge, imageUrl, url, horizontal = false }: {
  title: string, description: string, badge: string, imageUrl: string, url: string, horizontal?: boolean
}) {
  return (
    <Link href={url}>
      <Card className={`${horizontal ? 'min-h-auto' : 'min-h-64'} relative bg-cover p-0 bg-center overflow-hidden border-neutral-200 dark:border-neutral-700`} style={{ backgroundImage: `url(${imageUrl})` }}>
        <CardFooter className="flex flex-1 flex-col items-start justify-end gap-2 p-4 text-white
        bg-linear-to-t from-black via-black/60 to-white/10">
          <Badge variant={'secondary'}>{badge}</Badge>
          <span className='text-xl font-semibold'>{title}</span>
          <span className='text-xs font-light line-clamp-3'>{description}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default BlogCard
