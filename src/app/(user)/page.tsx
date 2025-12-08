import BlogContainer from "@/views/home/blog-container";
import FeaturedBlog from "@/views/home/featured-blog";

export default function Home() {
  return (
    <div className="col-span-12">
      <FeaturedBlog
        hasBadge
        hasButton
        badge="Editörün Seçimi"
        title="Öne Çıkan İçerik"
        subtitle="Sizin için seçilmiş en dikkat çekici, ilham veren ve en çok konuşulan içeriklerden derlenen okurların ilgisini en çok çeken, sadelik, kalite ve ilham veren fikirlerle dolu seçilmiş bir içerik." />
      <BlogContainer />
    </div>
  );
}
