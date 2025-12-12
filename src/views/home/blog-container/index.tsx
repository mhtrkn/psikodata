import React from 'react'
import BlogList from './blog-list'
import RecommendedSidebar from './recommended-sidebar'
import { Blog } from '@/types/blogs'

function BlogContainer({ blogs }: { blogs: Blog[] }) {
  if (!blogs) return <></>;

  return (
    <section className="col-span-12 grid grid-cols-12 gap-4 lg:gap-12">
      <BlogList blogs={blogs} />
      <RecommendedSidebar />
    </section>
  )
}

export default BlogContainer
