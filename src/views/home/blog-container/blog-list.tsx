import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { Blog } from "@/types/blogs";
import { RefreshCwIcon } from "lucide-react";
import Link from "next/link";
import BlogCard from "./blog-card";
import CardTitle from "./card-title";

function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="col-span-12 lg:col-span-9">
      <CardTitle name="Keşfetmeye Değer İçerikler." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {blogs.map(item => (
          <BlogCard
            key={item?.id}
            badge={item.category}
            imageUrl={item.thumbnail || '/images/not-found.png'}
            url={`/blog/${item.slug}`}
            title={item.title}
            description={item.excerpt}
          />
        ))}
      </div>
      <Link href={ROUTES.BLOG} passHref>
        <Button variant="secondary" className="flex items-center gap-2 self-center mx-auto mt-10">
          <RefreshCwIcon />
          Daha Fazla
        </Button>
      </Link>
    </div>
  )
}

export default BlogList
