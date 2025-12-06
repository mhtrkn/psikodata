import { Badge } from '@/components/ui/badge'
import React from 'react'

const popularTopics = [
  "Psikoloji",
  "Sağlık",
  "Beslenme",
  "Motivasyon",
  "Stres Yönetimi",
  "Uyku Düzeni",
]

function BlogPageSidebar() {
  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='flex flex-col gap-2'>
        <span className='whitespace-nowrap text-base lg:text-2xl font-medium'>
          Popüler Konular
        </span>
        <div className='flex flex-wrap items-center gap-2 mt-2'>
          {popularTopics.map((topic, index) => (
            <Badge variant={'secondary'} key={index} className="cursor-pointer hover:bg-primary hover:text-card text-sm">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogPageSidebar
