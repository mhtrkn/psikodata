import { blogService } from '@/services/blog-service';
import BlogDetailView from '@/views/blog/blog-detail';

interface BlogDetailPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const { slug } = await props.params;

  const blog = await blogService.server.getBySlug(slug);

  if (!blog) {
    throw new Error("Blog not found");
  }

  const author = await blogService.server.getAuthorById(blog.author_id);

  return <BlogDetailView blog={blog} author={author} />;
}
