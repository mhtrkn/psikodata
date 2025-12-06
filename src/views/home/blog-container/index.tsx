import React from 'react'
import BlogList from './blog-list'
import RecommendedSidebar from './recommended-sidebar'

function BlogContainer() {
  return (
    <section className="col-span-12 grid grid-cols-12 gap-4 lg:gap-12">
      <BlogList />
      <RecommendedSidebar />
    </section>
  )
}

export default BlogContainer
