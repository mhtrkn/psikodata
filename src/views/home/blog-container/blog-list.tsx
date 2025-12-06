"use client";

import { Button } from "@/components/ui/button"
import BlogCard from "./blog-card"
import CardTitle from "./card-title"
import { RefreshCwIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

const blogData = [
  {
    badge: "Beslenme & Sağlık",
    imageUrl: "/images/blog1.jpg",
    title: "Kilo verdiren en faydalı 10 besin",
    description: "Bu besinler metabolizmanızı hızlandırır ve sağlıklı kilo vermenize yardımcı olur.",
    slug: "kilo-verdiren-en-faydali-10-besin"
  },
  {
    badge: "Zihin & Psikoloji",
    imageUrl: "/images/blog2.jpg",
    title: "Stresi azaltmanın yolları",
    description: "Günlük hayatta uygulayabileceğiniz basit tekniklerle stresi azaltabilirsiniz.",
    slug: "stresi-azaltmanin-yollari"
  },
  {
    badge: "Yaşam & Motivasyon",
    imageUrl: "/images/blog3.jpg",
    title: "Motivasyonunuzu artıracak 7 alışkanlık",
    description: "Küçük rutinler, gününüzü daha verimli ve pozitif hale getirebilir.",
    slug: "motivasyonunuzu-artiracak-7-aliskanlik"
  },
  {
    badge: "Zihin & Psikoloji",
    imageUrl: "/images/blog4.jpg",
    title: "Anksiyete ile başa çıkma teknikleri",
    description: "Anksiyeteyi yönetmenin yollarını öğrenin ve günlük yaşamda uygulayın.",
    slug: "anksiyete-ile-basa-cikma-teknikleri"
  },
  {
    badge: "Beslenme & Sağlık",
    imageUrl: "/images/blog5.jpg",
    title: "Bağışıklığınızı güçlendiren besinler",
    description: "Hastalıklara karşı direncinizi artıracak besinleri keşfedin.",
    slug: "bagisiklik-gucunu-artiran-besinler"
  },
  {
    badge: "Yaşam & Motivasyon",
    imageUrl: "/images/blog6.jpg",
    title: "Daha iyi uyumak için ipuçları",
    description: "Kaliteli bir uyku için basit ve etkili alışkanlıklar edinin.",
    slug: "daha-iyi-uyumak-icin-ipuclari"
  }
];

function BlogList() {
  const router = useRouter();

  const handleRoute = () => {
    router.push(ROUTES.BLOG)
  }
  return (
    <div className="col-span-12 lg:col-span-9">
      <CardTitle name="Keşfetmeye Değer İçerikler." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {blogData.map((item, index) => (
          <BlogCard
            key={index}
            badge={item.badge}
            imageUrl={item.imageUrl}
            url={`/blog/${item.slug}`}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      <Button onClick={handleRoute} variant={"secondary"} className="flex items-center gap-2 self-center mx-auto mt-10 cursor-pointer">
        <RefreshCwIcon />
        Daha Fazla
      </Button>
    </div>
  )
}

export default BlogList
