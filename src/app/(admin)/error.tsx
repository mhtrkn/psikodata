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
    console.error('Admin Error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h2 className="mb-4 text-3xl font-bold">Yönetim Paneli Hatası</h2>
        <p className="mb-6 text-muted-foreground">
          Yönetim panelinde bir hata oluştu. Lütfen tekrar deneyin veya giriş sayfasına dönün.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Tekrar Dene</Button>
          <Button variant="outline" asChild>
            <Link href="/admin">Giriş Sayfası</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
