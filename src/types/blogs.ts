export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail: string | null;
  category: string;
  tags: string[];
  is_published: boolean | null;
  author_id: string;
  created_at: string;
  is_featured: boolean | null;
};

export type BlogListResponse = {
  blogs: Blog[];
}

export type BlogResponse = {
  blog: Blog
}
