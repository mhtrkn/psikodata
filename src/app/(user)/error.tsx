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
    console.error('User Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold">Bir hata oluştu</h2>
        <p className="mb-6 text-muted-foreground">
          Sayfa yüklenirken bir sorun oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Tekrar Dene</Button>
          <Button variant="outline" asChild>
            <Link href="/">Ana Sayfa</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
