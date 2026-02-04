import { ROUTES } from '@/routes'
import Image from 'next/image'
import Link from 'next/link'

function BlogDetailNotFoundPage() {
  return (
    <div className="col-span-12 flex flex-1 flex-col items-center justify-center px-4 mt-20 text-center">
      <Image src={"/icons/leaf.png"} alt="Not Found" width={128} height={128} className="opacity-50" />
      <h2 className="text-2xl font-semibold mb-8">Blog Bulunamadı!</h2>
      <p className="max-w-lg text-lg text-muted-foreground mb-6">
        Üzgünüz ama aradığınız sayfa mevcut değil.
        <br />
        Blog sayfasına dönerek veya arama çubuğunu kullanarak aradığınız içeriklere ulaşabilirsiniz.
      </p>
      <Link
        href={ROUTES.BLOG}
        className="px-6 py-3 underline text-primary text-lg rounded-md transition"
      >
        Blog sayfasına dön
      </Link>
    </div>
  )
}

export default BlogDetailNotFoundPage
