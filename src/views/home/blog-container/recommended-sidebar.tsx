import React from 'react'
import CardTitle from './card-title'
import BlogCard from './blog-card'

function RecommendedSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-10 lg:col-span-3 ">
      <div>
        <CardTitle name="Önerilenler" />
        <div className='grid grid-cols-1 gap-3 mt-4'>
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        </div>
      </div>

      <div>
        <CardTitle name="En Yeniler" />
        <div className='grid grid-cols-1 gap-3 mt-4'>
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
          <BlogCard horizontal badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        </div>
      </div>
    </aside>
  )
}

export default RecommendedSidebar
