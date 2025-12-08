import { BlogIcon } from "@/assets/icons";
import Providers from "@/components/layout/providers";
import { ROUTES } from "@/routes";
import Link from "next/link";
import "./globals.css";

function NotFoundPage() {
  return (
    <html lang="tr" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`min-h-screen grid grid-rows-[auto_1fr_auto] bg-card text-card-foreground font-sans`}
      >
        <Providers>
          <div className="col-span-12 flex flex-1 flex-col items-center justify-center px-4 mt-20 text-center">
            <BlogIcon width={128} height={128} className="fill-current text-card-foreground" />
            <h2 className="text-2xl font-semibold mb-2">İçerik Bulunamadı</h2>
            <p className="max-w-lg text-lg text-muted-foreground mb-6">
              Üzgünüz, aradığınız sayfa mevcut değil veya taşınmış olabilir. Anasayfaya dönerek veya arama çubuğunu kullanarak aradığınız içeriklere ulaşabilirsiniz.
            </p>
            <Link
              href={ROUTES.HOME}
              className="px-6 py-3 underline text-primary text-lg rounded-md transition"
            >
              Anasayfaya Dön
            </Link>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export default NotFoundPage
