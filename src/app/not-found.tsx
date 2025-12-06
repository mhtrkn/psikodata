import { BlogIcon } from "@/assets/icons";
import { ROUTES } from "@/routes";
import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-card text-foreground px-4 mt-20 text-center">
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
  );
}

export default NotFoundPage
