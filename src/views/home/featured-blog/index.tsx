import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function FeaturedBlog() {
  return (
    <section className="col-span-12 flex w-full h-fit mt-10 mb-12 flex-col items-center justify-center gap-4 ">
      <Badge variant="secondary">Editörün Seçimi</Badge>
      <h2 className="text-5xl font-semibold">
        Öne Çıkan İçerik
      </h2>
      <h4 className="max-w-3xl text-lg text-neutral-500">Sizin için seçilmiş en dikkat çekici, ilham veren ve en çok konuşulan içeriklerden derlenen okurların ilgisini en çok çeken, sadelik, kalite ve ilham veren fikirlerle dolu seçilmiş bir içerik.</h4>
      <Button className="cursor-pointer">Keşfet</Button>
    </section>
  )
}

export default FeaturedBlog
