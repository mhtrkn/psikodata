'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Blog Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold">Blog Yükleme Hatası</h2>
        <p className="mb-6 text-muted-foreground">
          Blog içeriği yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Tekrar Dene</Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Tüm Bloglar</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
