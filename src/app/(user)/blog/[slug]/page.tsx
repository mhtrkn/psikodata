import { blogService } from '@/services/blog-service';
import BlogDetailView from '@/views/blog/blog-detail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogDetailPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export async function generateMetadata(props: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const blog = await blogService.server.getBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Bulunamadı | psikodata',
    };
  }

  const title = `${blog.title} | psikodata`;
  const description = blog.excerpt || `${blog.title} - psikodata Blog`;

  return {
    title,
    description,
    keywords: blog.tags,
    openGraph: {
      title: blog.title,
      description,
      type: 'article',
      publishedTime: blog.created_at,
      tags: blog.tags,
      ...(blog.thumbnail && {
        images: [{ url: blog.thumbnail, alt: blog.title }],
      }),
    },
    twitter: {
      card: blog.thumbnail ? 'summary_large_image' : 'summary',
      title: blog.title,
      description,
      ...(blog.thumbnail && {
        images: [blog.thumbnail],
      }),
    },
  };
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
