import CustomBreadcrumb from '@/components/theme/breadcrumb'
import { Separator } from '@/components/ui/separator'
import BlogPageList from '@/views/blog/blog-page-list'
import FeaturedBlog from '@/views/home/featured-blog'

function BlogPageView() {
  return (
    <div>
      <FeaturedBlog
        badge='Blog'
        title='Tüm Blog Yazıları'
        subtitle='Psikoloji, zihin sağlığı ve kişisel gelişim üzerine hazırlanmış, ilham verici ve bilgilendirici içeriklerin tamamını burada keşfedebilirsiniz.'
      />
      <CustomBreadcrumb />
      <Separator className='mt-10' />
      <BlogPageList />
    </div>
  )
}

export default BlogPageView
