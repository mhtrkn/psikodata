// import { TextareaDemo } from "@/components/theme/text-area"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// function NewBlog() {
//   return (
//     <div className='flex flex-col gap-10'>
//       <h2 className='text-2xl font-medium text-card-foreground'>
//         Yeni Blog
//       </h2>

//       <form className='grid grid-cols-2 gap-4 place-items-start'>
//         <div className="flex col-span-1 w-full flex-col gap-3">
//           <Label htmlFor="blog-name">Blog Başlığı</Label>
//           <Input type="text" id="blog-name" placeholder="Örn: Blog Başlığı" className="py-2.5! h-fit!" />
//         </div>
//         <div className="flex col-span-1 w-full flex-col gap-3">
//           <Label htmlFor="blog-name">Blog Özeti</Label>
//           <TextareaDemo id="blog-name" placeholder="Özeti buraya yazın." />
//         </div>
//       </form>
//     </div>
//   )
// }

// export default NewBlog

"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TiptapEditor from "@/components/admin/editor/TiptapEditor";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-medium text-card-foreground">
        Yeni Blog
      </h2>

      <form className="grid grid-cols-2 gap-6 place-items-start w-full">

        {/* Title */}
        <div className="flex w-full flex-col gap-3 col-span-1">
          <Label>Başlık</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: 2025'te Web Geliştirme"
          />
        </div>

        {/* Slug */}
        <div className="flex w-full flex-col gap-3 col-span-1">
          <Label>Slug (otomatik de olabilir)</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase())}
            placeholder="örn: 2025-web-gelistirme"
          />
        </div>

        {/* Excerpt */}
        <div className="flex w-full flex-col gap-3 col-span-2">
          <Label>Kısa Açıklama / Özet</Label>
          <Input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Blog için kısa bir açıklama yazın"
          />
        </div>

        {/* Content (Rich Text) */}
        <div className="flex w-full flex-col gap-3 col-span-2">
          <Label>İçerik</Label>
          <TiptapEditor value={content} onChange={setContent} />
        </div>

        {/* Thumbnail */}
        <div className="flex w-full flex-col gap-3 col-span-1">
          <Label>Kapak Görseli Url</Label>
          <Input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://..."
          />
        </div>

        {/* Category */}
        <div className="flex w-full flex-col gap-3 col-span-1">
          <Label>Kategori</Label>
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Örn: Yazılım, Psikoloji..."
          />
        </div>

        {/* Tags */}
        <div className="flex w-full flex-col gap-3 col-span-2">
          <Label>Etiketler (virgülle ayır)</Label>
          <Input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="nextjs,react,frontend"
          />
        </div>

        {/* Publish */}
        <div className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
          />
          <Label>Yayınla</Label>
        </div>

      </form>
    </div>
  );
}

export default NewBlog;
