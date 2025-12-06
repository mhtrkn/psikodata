import { Button } from "@/components/ui/button"
import BlogCard from "./blog-card"
import CardTitle from "./card-title"
import { RefreshCwIcon } from "lucide-react"

function BlogList() {
  return (
    <div className="col-span-12 lg:col-span-9 p-4 xl:p-0">
      <CardTitle name="Keşfetmeye Değer İçerikler." />
      <div className="grid grid-cols-3 gap-6 mt-4">
        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />

        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
        <BlogCard badge="Beslenme & Sağlık" imageUrl='' url="#" title="Kilo verdiren en faydalı 10 besin" description="Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet." />
      </div>
      <Button variant={"secondary"} className="flex items-center gap-2 self-center mx-auto mt-10 cursor-pointer">
        <RefreshCwIcon />
        Daha Fazla
      </Button>
    </div>
  )
}

export default BlogList
