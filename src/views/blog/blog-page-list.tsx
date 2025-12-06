import BlogCategoriesList from "./blog-categories"
import BlogPageSidebar from "./sidebar"

function BlogPageList() {
  return (
    <div className='w-full grid grid-cols-12 gap-2 lg:gap-6 mt-10'>
      <div className='col-span-12 lg:col-span-9'>
        <BlogCategoriesList />
      </div>
      <div className='hidden lg:block col-span-3'>
        <BlogPageSidebar />
      </div>
    </div>
  )
}

export default BlogPageList
