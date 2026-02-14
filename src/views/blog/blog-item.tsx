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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowRightIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

function BlogItem({ title, description, badge, url, imageUrl, isDeletable = false }: {
  title: string, description: string, badge: string, url: string, imageUrl: string, isDeletable?: boolean
}) {
  const router = useRouter();

  const handleRoute = (url: string) => {
    router.push(url)
  }

  if (isDeletable) {
    return (
      <Item className='group border-b border-b-neutral-200 dark:border-b-neutral-700 rounded-none last:border-none p-0 lg:pb-6'>
        <ItemHeader className='text-2xl font-medium text-card-foreground -mb-4'>
          {title}
        </ItemHeader>
        <ItemContent className='flex flex-row justify-between items-center gap-10'>
          <ItemDescription className='lg:mt-4'>{description}</ItemDescription>

          {/* Silme Onay Dialogu */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant='ghost'
                className='text-destructive hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all'
              >
                <TrashIcon className='w-4 h-4' />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Blogu Sil</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogDescription>
                <strong>{title}</strong> isimli blog yazısı kalıcı olarak silinecektir. Devam etmek istediğinize emin misiniz?
              </AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {}}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </ItemContent>
      </Item>
    )
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
