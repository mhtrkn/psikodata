import { ROUTES } from "@/routes";
import { blogService } from "@/services/blog-service";
import BlogContainer from "@/views/home/blog-container";
import HeroSection from "@/views/home/hero-section";
import FeaturedBlog from "@/views/home/featured-blog";

export default async function Home() {
  const blogs = await blogService.server.getAll();
  const featured = blogs.find(item => item?.is_featured);

  return (
    <div className="col-span-12">
      <HeroSection
        primaryButtonUrl={ROUTES.BLOG}
        secondaryButtonUrl={ROUTES.ABOUT}
      />

      <div className="mt-8 mb-12">
        <FeaturedBlog
          data={featured}
          hasBadge
          hasButton
          firstSectionVisible={false}
          badge="Editörün Seçimi"
          title="Öne Çıkan İçerik"
          url={`${ROUTES.BLOG}/${featured?.slug}`}
          subtitle="Sizin için seçilmiş en dikkat çekici, ilham veren ve en çok konuşulan içeriklerden derlenen okurların ilgisini en çok çeken içerik."
        />
      </div>

      <BlogContainer blogs={blogs} />
    </div>
  );
}
