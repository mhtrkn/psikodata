"use client";

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Blog } from "@/types/blogs";
import { useRouter } from "next/navigation"

function FeaturedBlog({
  badge, data, title, subtitle, hasBadge = false, hasButton = false, url = "", buttonTitle = 'Keşfet'
}: {
  data: Blog | undefined, badge: string, title: string, subtitle: string, hasBadge?: boolean, hasButton?: boolean, url?: string, buttonTitle?: string
}) {
  const router = useRouter();

  const handleRoute = () => {
    if (url) {
      router.push(url)
    }
  }

  return (
    <section className="col-span-12 flex w-full h-fit mt-10 mb-12 flex-col items-center justify-center gap-4 ">
      {hasBadge && (
        <Badge variant="secondary">{badge}</Badge>
      )}
      <h2 className="text-3xl xl:text-5xl font-semibold text-center">
        {title}
      </h2>
      <h4 className="max-w-3xl text-sm xl:text-lg text-neutral-500 text-center">{subtitle}</h4>
      {hasButton && (
        <Button onClick={handleRoute} className="cursor-pointer">{buttonTitle}</Button>
      )}
    </section>
  )
}

export default FeaturedBlog
