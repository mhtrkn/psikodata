import { Badge } from '@/components/ui/badge'
import { Card, CardFooter } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function BlogCard({ title, description, badge, imageUrl, url, horizontal = false }: {
  title: string, description: string, badge: string, imageUrl: string, url: string, horizontal?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={url}>
          <Card className={`${horizontal ? 'min-h-auto' : 'min-h-64'} relative bg-cover p-0 bg-center overflow-hidden border-neutral-200 dark:border-neutral-700`} style={{ backgroundImage: `url(${imageUrl})` }}>
            <CardFooter className="flex flex-1 flex-col items-start justify-end gap-2 p-4 text-white
        bg-linear-to-t from-black/60 via-black/30 to-transparent">
              <Badge variant={'secondary'}>{badge}</Badge>
              <span className='text-xl font-semibold'>{title}</span>
              <span className='text-xs font-light line-clamp-3'>{description}</span>
            </CardFooter>
          </Card>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>Detayları görüntülemek için içeriğe tıklayabilirsiniz.</p>
      </TooltipContent>
    </Tooltip>

  )
}

export default BlogCard
