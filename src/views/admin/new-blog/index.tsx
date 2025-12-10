"use client";

import { TextareaDemo } from "@/components/theme/text-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { Button } from "@/components/ui/button";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
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
          <TextareaDemo
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Blog için kısa bir açıklama yazın"
          />
        </div>

        {/* Content (Rich Text) */}
        <div className="flex w-full flex-col gap-3 col-span-2">
          <Label>İçerik</Label>
          <SimpleEditor />
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
        <div className="flex w-full flex-col gap-3 col-span-2 relative">
          <Label className="flex items-center justify-between gap-10">Konu Başlıkları (Topics)
            <div className="flex w-fit items-center self-end text-xs text-muted-foreground -mb-1 mr-1 font-light leading-none">
              Konu başlığı eklemek için &quot;Enter&apos;a&quot; basın.
            </div>
          </Label>
          <TagInput value={tags} onChange={setTags} placeholder="Örn: Psikoloji, Stres Yönetimi, Sağlık & Beslenme" />

        </div>

        {/* Publish */}
        <div className="flex items-center gap-2 col-span-2">
          <Switch id="published" checked={isPublished} onCheckedChange={() => setIsPublished(!isPublished)} />
          <Label htmlFor="published">Hemen yayınlansın mı?</Label>
        </div>

        <div className="flex items-center gap-4 w-fit ml-auto col-span-2">
          <Button variant={"secondary"}>
            Vazgeç
          </Button>
          <Button>
            Paylaş
          </Button>
        </div>

      </form>
    </div>
  );
}

export default NewBlog;
