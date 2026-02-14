'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold">Bir hata oluştu</h2>
        <p className="mb-6 text-muted-foreground">
          Üzgünüz, beklenmeyen bir hata meydana geldi. Lütfen tekrar deneyin.
        </p>
        <Button onClick={reset}>Tekrar Dene</Button>
      </div>
    </div>
  )
}
