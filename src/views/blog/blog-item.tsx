"use client";

import { Button } from '@/components/ui/button'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item"
import { ArrowRightIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

function BlogItem({ title, description, badge, url, imageUrl }: {
  title: string, description: string, badge: string, url: string, imageUrl: string
}) {
  const router = useRouter();

  const handleRoute = (url: string) => {
    router.push(url)
  }
  return (
    <Item className='border-b border-b-neutral-200 dark:border-b-neutral-700 rounded-none last:border-none p-0 lg:px-4 lg:pb-6'>
      <ItemHeader className='inline-flex items-center justify-start gap-4 text-sm font-medium text-neutral-500 dark:text-neutral-500'>
        Ağustos 15, 2025
        <span>|</span>
        <span className='text-primary'>1 saat önce</span>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className='text-2xl lg:text-3xl font-semibold'>{title}</ItemTitle>
        <ItemDescription className='lg:mt-4'>{description}</ItemDescription>
      </ItemContent>
      <ItemFooter>
        <Button className='pl-0! cursor-pointer' variant={'link'} onClick={() => handleRoute(url)}>
          Devamını Oku
          <ArrowRightIcon />
        </Button>
      </ItemFooter>
    </Item>
  )
}

export default BlogItem
