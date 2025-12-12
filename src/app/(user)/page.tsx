import { ROUTES } from "@/routes";
import { blogService } from "@/services/blog-service";
import BlogContainer from "@/views/home/blog-container";
import FeaturedBlog from "@/views/home/featured-blog";

export default async function Home() {
  const blogs = await blogService.server.getAll();
  const featured = blogs.find(item => item?.is_featured);

  return (
    <div className="col-span-12">
      <FeaturedBlog
        data={featured}
        hasBadge
        hasButton
        badge="Editörün Seçimi"
        title="Öne Çıkan İçerik"
        url={`${ROUTES.BLOG}/${featured?.slug}`}
        subtitle="Sizin için seçilmiş en dikkat çekici, ilham veren ve en çok konuşulan içeriklerden derlenen okurların ilgisini en çok çeken, sadelik, kalite ve ilham veren fikirlerle dolu seçilmiş bir içerik." />
      <BlogContainer blogs={blogs} />
    </div>
  );
}
