import { blogService } from '@/services/blog-service';
import BlogDetailView from '@/views/blog/blog-detail';
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function BlogDetailPage(props: BlogDetailPageProps) {
  const { slug } = await props.params;

  const blog = await blogService.server.getBySlug(slug);

  if (!blog) {
    notFound()
  }

  const author = await blogService.server.getAuthorById(blog.author_id);

  return <BlogDetailView blog={blog} author={author} />;
}
