import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import BlogItem from "./blog-item"

const categories = [
  { value: "all", label: "Tümü" },
  { value: "psychology", label: "Psikoloji" },
  { value: "health", label: "Sağlık" },
  { value: "nutrition", label: "Beslenme" },
]

const blogs = [
  {
    title: "Depresyon Belirtileri ve Çözümler",
    slug: "depresyon-belirtileri-ve-cozumler",
    category: "psychology",
    description: "Depresyonun belirtilerini tanımak, erken müdahale ve yaşam kalitesini artırmak açısından kritik öneme sahiptir. Bu yazıda, depresyonun yaygın semptomları, duygu durum değişiklikleri, motivasyon kaybı, uyku ve iştah sorunları gibi etkileri ele alınmakta ve bu durumlarla başa çıkmak için önerilen terapi ve destek yöntemleri detaylı şekilde anlatılmaktadır.",
    imageUrl: "/images/blog1.jpg",
  },
  {
    title: "Stres Yönetimi Teknikleri",
    slug: "stres-yonetimi-teknikleri",
    category: "psychology",
    description: "Günlük yaşamın getirdiği baskılar ve yoğunluklar çoğu zaman stresi artırabilir. Bu makalede, stresi azaltmak için nefes egzersizleri, mindfulness, zaman yönetimi, fiziksel aktivite ve meditasyon gibi bilimsel olarak desteklenen yöntemler anlatılmakta, kişisel farkındalığı artırarak zihinsel ve duygusal dengeyi koruma stratejileri sunulmaktadır.",
    imageUrl: "/images/blog2.jpg",
  },
  {
    title: "Sağlıklı Beslenme Önerileri",
    slug: "saglikli-beslenme-onerileri",
    category: "health",
    description: "Dengeli ve sağlıklı beslenme, hem fiziksel hem de zihinsel sağlığımız için kritik öneme sahiptir. Bu yazıda, günlük öğünlerde hangi besin gruplarının tercih edilmesi gerektiği, vitamin ve mineral dengesi, işlenmiş gıdalardan kaçınmanın faydaları ve su tüketiminin önemi detaylı bir şekilde ele alınmaktadır. Ayrıca sağlıklı tarif önerileri de sunulmaktadır.",
    imageUrl: "/images/blog3.jpg",
  },
  {
    title: "Kilo Vermeye Yardımcı 10 Besin",
    slug: "kilo-vermeye-yardimci-10-besin",
    category: "nutrition",
    description: "Kilo verme sürecinde beslenme stratejisi büyük önem taşır. Bu içerikte, metabolizmayı hızlandıran, tok kalmayı destekleyen ve düşük kalorili 10 besin detaylı olarak incelenmekte, her bir besinin sağladığı faydalar, tüketim önerileri ve kolay tarif fikirleriyle birlikte sunulmaktadır. Böylece sağlıklı kilo kaybı desteklenmiş olur.",
    imageUrl: "/images/blog4.jpg",
  },
  {
    title: "Uyku ve Psikoloji İlişkisi",
    slug: "uyku-ve-psikoloji-iliskisi",
    category: "psychology",
    description: "Yeterli ve kaliteli uyku, ruh sağlığını doğrudan etkileyen temel bir faktördür. Bu makalede, uyku eksikliğinin depresyon, kaygı ve stres seviyeleri üzerindeki etkileri, uyku hijyenini iyileştirme yöntemleri ve günlük rutinler ile uyku kalitesini artırmanın yolları detaylı bir şekilde ele alınmaktadır.",
    imageUrl: "/images/blog5.jpg",
  },
  {
    title: "Motivasyon Artırıcı Egzersizler",
    slug: "motivasyon-artirici-egzersizler",
    category: "health",
    description: "Motivasyon, kişisel hedeflere ulaşmada ve günlük yaşamda verimli olabilmekte önemli rol oynar. Bu yazıda, motivasyonu artırmak için uygulanabilecek fiziksel ve zihinsel egzersizler, rutin oluşturma yöntemleri, pozitif alışkanlıklar ve psikolojik destek teknikleri detaylı olarak anlatılmaktadır. Egzersizlerle ruh ve bedenin uyumu güçlendirilir.",
    imageUrl: "/images/blog6.jpg",
  },
]

function BlogCategoriesList() {
  return (
    <div className='w-full'>
      <Tabs defaultValue="all">
        <TabsList className="flex items-center justify-start gap-4 mb-2 overflow-x-auto w-full bg-card p-1 scrollbar-hide">
          {categories.map((category) => (
            <TabsTrigger
              key={category.value}
              value={category.value}
              className="flex-none cursor-pointer hover:bg-secondary inline-flex data-[state=active]:bg-primary data-[state=active]:text-card text-muted-foreground hover:text-card-foreground rounded px-3 py-1"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.value} value={category.value}>
            <div className="grid grid-cols-1 gap-6 mt-4">
              {blogs
                .filter(blog => category.value === "all" || blog.category === category.value)
                .map(blog => (
                  <BlogItem
                    key={blog.slug}
                    title={blog.title}
                    description={blog.description}
                    badge={blog.category}
                    imageUrl={blog.imageUrl}
                    url={`/blog/${blog.slug}`}
                  />
                ))
              }
            </div>
          </TabsContent>
        ))}

      </Tabs>
    </div>
  )
}

export default BlogCategoriesList
