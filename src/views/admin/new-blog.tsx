// "use client";

// import { TextareaDemo } from "@/components/theme/text-area";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
// import { Switch } from "@/components/ui/switch";
// import { TagInput } from "@/components/ui/tag-input";
// import { Button } from "@/components/ui/button";

// function NewBlog() {
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [excerpt, setExcerpt] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [category, setCategory] = useState("");
//   const [tags, setTags] = useState<string[]>([]);
//   const [isPublished, setIsPublished] = useState(false);

//   return (
//     <div className="flex flex-col gap-10">
//       <h2 className="text-2xl font-medium text-card-foreground">
//         Yeni Blog
//       </h2>

//       <form className="grid grid-cols-2 gap-6 place-items-start w-full">

//         {/* Title */}
//         <div className="flex w-full flex-col gap-3 col-span-1">
//           <Label>Başlık</Label>
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Örn: 2025'te Web Geliştirme"
//           />
//         </div>

//         {/* Slug */}
//         <div className="flex w-full flex-col gap-3 col-span-1">
//           <Label>Slug (otomatik de olabilir)</Label>
//           <Input
//             value={slug}
//             onChange={(e) => setSlug(e.target.value.toLowerCase())}
//             placeholder="örn: 2025-web-gelistirme"
//           />
//         </div>

//         {/* Excerpt */}
//         <div className="flex w-full flex-col gap-3 col-span-2">
//           <Label>Kısa Açıklama / Özet</Label>
//           <TextareaDemo
//             value={excerpt}
//             onChange={(e) => setExcerpt(e.target.value)}
//             placeholder="Blog için kısa bir açıklama yazın"
//           />
//         </div>

//         {/* Content (Rich Text) */}
//         <div className="flex w-full flex-col gap-3 col-span-2">
//           <Label>İçerik</Label>
//           <SimpleEditor />
//         </div>

//         {/* Thumbnail */}
//         <div className="flex w-full flex-col gap-3 col-span-1">
//           <Label>Kapak Görseli Url</Label>
//           <Input
//             value={thumbnail}
//             onChange={(e) => setThumbnail(e.target.value)}
//             placeholder="https://..."
//           />
//         </div>

//         {/* Category */}
//         <div className="flex w-full flex-col gap-3 col-span-1">
//           <Label>Kategori</Label>
//           <Input
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             placeholder="Örn: Yazılım, Psikoloji..."
//           />
//         </div>

//         {/* Tags */}
//         <div className="flex w-full flex-col gap-3 col-span-2 relative">
//           <Label className="flex items-center justify-between gap-10">Konu Başlıkları (Topics)
//             <div className="flex w-fit items-center self-end text-xs text-muted-foreground -mb-1 mr-1 font-light leading-none">
//               Konu başlığı eklemek için &quot;Enter&apos;a&quot; basın.
//             </div>
//           </Label>
//           <TagInput value={tags} onChange={setTags} placeholder="Örn: Psikoloji, Stres Yönetimi, Sağlık & Beslenme" />

//         </div>

//         {/* Publish */}
//         <div className="flex items-center gap-2 col-span-2">
//           <Switch id="published" checked={isPublished} onCheckedChange={() => setIsPublished(!isPublished)} />
//           <Label htmlFor="published">Hemen yayınlansın mı?</Label>
//         </div>

//         <div className="flex items-center gap-4 w-fit ml-auto col-span-2">
//           <Button variant={"secondary"}>
//             Vazgeç
//           </Button>
//           <Button>
//             Paylaş
//           </Button>
//         </div>

//       </form>
//     </div>
//   );
// }

// export default NewBlog;


"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { file, z } from "zod";

import { toast } from "sonner";

import { TextareaDemo } from "@/components/theme/text-area";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { ROUTES } from "@/routes";
import { blogService } from "@/services/blog-service";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { slugify } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
  slug: z.string().min(3, "Slug en az 3 karakter olmalı"),
  excerpt: z.string().min(10, "Özet en az 10 karakter olmalı"),
  content: z.string().min(20, "İçerik en az 20 karakter olmalı"),
  thumbnail: z.string(),
  thumbnailFile: z.any().refine((file) => file instanceof File, "Lütfen, geçerli bir görsel seçin"),
  category: z.string().min(2, "Kategori zorunlu"),
  tags: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  author_id: z.string().uuid("Geçerli bir yazar seçin"),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function NewBlogForm() {
  const router = useRouter();

  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      thumbnail: "",
      thumbnailFile: undefined,
      category: "",
      tags: [],
      is_published: false,
      author_id: "",
    },
  });

  useEffect(() => {
    let mounted = true;
    setLoadingAuthors(true);

    (async () => {
      try {
        const res = await fetch("/api/authors/get-all");
        if (!res.ok) throw new Error("Yazarlar alınamadı");
        const data = await res.json();
        if (!mounted) return;
        setAuthors(data?.authors ?? data ?? []);
      } catch (err) {
        console.error(err);
        toast.error("Yazar listesi yüklenemedi.");
      } finally {
        setLoadingAuthors(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      const title = values.title;
      const slug = values.slug;

      // Kullanıcı slug'a manuel yazdıysa bir daha otomatik oluşturma
      if (name === "slug" && slug) return;

      // Sadece title değiştiğinde slug üret
      if (name === "title" && title) {
        const generated = slugify(title);

        // Minimum 3 karakter kontrolü, boş slug üretme
        if (generated.length < 3) return;

        form.setValue("slug", generated, {
          shouldValidate: false, // burada validate etme!
          shouldDirty: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);


  async function onSubmit(values: BlogFormValues) {
    try {
      let thumbnailUrl;

      if (values?.thumbnailFile) {
        thumbnailUrl = await blogService.uploadThumbnail(values?.thumbnailFile) || "";
      }

      const payload = {
        title: values.title,
        slug: values.slug,
        excerpt: values.excerpt,
        content: values.content,
        thumbnail: thumbnailUrl,
        category: values.category,
        tags: values.tags ?? [],
        is_published: !!values.is_published,
        author_id: values.author_id,
      };

      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Blog oluşturulamadı", { description: data?.error ?? "Sunucu hatası" });
        return;
      }

      toast.success("Blog başarıyla oluşturuldu");
      router.push(ROUTES.ADMIN.DASHBOARD);
    } catch (err) {
      console.error("create blog error:", err);
      toast.error("Sunucu hatası: Blog oluşturulamadı");
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-card-foreground">
          Yeni Blog Oluştur
        </h1>
        <Separator />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 place-items-start w-full">

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Başlık</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Örn: 2025'te Web Geliştirme" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="örn: 2025-web-gelistirme" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author select */}
          <FormField
            control={form.control}
            name="author_id"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Yazar</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => field.onChange(val)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={loadingAuthors ? "Yükleniyor..." : "Yazar seçin"} />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Kategori</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="örn: Yazılım, Psikoloji" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Excerpt */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>Kısa Açıklama / Özet</FormLabel>
                <FormControl>
                  <TextareaDemo
                    value={field.value}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => field.onChange(e.target.value)}
                    placeholder="Blog için kısa bir açıklama veya özet yazın"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content (rich editor via Controller) */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full">
                <FormLabel>İçerik</FormLabel>
                <SimpleEditor
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnail */}
          <FormField
            control={form.control}
            name="thumbnailFile"
            render={({ field }) => (
              <FormItem className="col-span-1 w-full">
                <FormLabel>Kapak Görseli</FormLabel>
                <FormControl>
                  <div className="w-full">
                    <Input
                      id="thumbnailFileInput"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        field.onChange(file)
                      }}
                    />

                    <Label
                      htmlFor="thumbnailFileInput"
                      className="flex flex-col items-center justify-center border border-dashed rounded-md min-h-40 cursor-pointer bg-accent/25 hover:bg-accent/40 transition p-4"
                    >
                      {
                        form?.getValues().thumbnailFile ? (
                          <div className="flex flex-col items-center space-y-1 py-4">
                            <div className="text-sm font-medium">
                              Seçilen Dosya:
                            </div>

                            <div className="text-xs text-muted-foreground max-w-60 truncate">
                              {form.getValues().thumbnailFile?.name}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-2 py-6">
                            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center border border-dashed">
                              <span className="text-2xl leading-none">+</span>
                            </div>

                            <span className="font-medium text-sm">
                              Fotoğraf yüklemek için tıklayın
                            </span>

                            <span className="text-xs text-muted-foreground">

                            </span>
                            <span className="text-xs text-center text-muted-foreground">
                              Desteklenen formatlar: JPG, JPEG PNG, WEBP
                              <br></br>
                              Maksimum dosya boyutu: 5 MB
                            </span>
                          </div>
                        )
                      }
                    </Label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-1 w-full flex flex-col justify-between h-full">
            {/* Tags (TagInput via Controller) */}
            <FormField
              control={form.control}
              name="tags"
              render={() => (
                <FormItem className="w-full">
                  <FormLabel>Konu Başlıkları (Tags)</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="tags"
                      render={({ field: controllerField }) => (
                        <TagInput
                          value={controllerField.value || []}
                          onChange={(val: string[]) => controllerField.onChange(val)}
                          placeholder="Etiketleri girin, Enter ile ekleyin"
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Publish switch */}
            <FormField
              control={form.control}
              name="is_published"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Field orientation="horizontal" className="items-center justify-between">

                      {/* Sol Taraf */}
                      <FieldContent>
                        <FieldLabel htmlFor="is_published_switch">
                          Hemen yayınlansın mı?
                        </FieldLabel>
                        <FieldDescription className="max-w-2/3 text-sm">
                          Bu ayarı etkinleştirdiğinizde, blog kaydedildiği anda otomatik olarak yayına alınır ve ziyaretçilere görünür hale gelir.
                        </FieldDescription>
                      </FieldContent>

                      {/* Sağ Taraf (Switch) */}
                      <Switch
                        id="is_published_switch"
                        checked={!!field.value}
                        onCheckedChange={(v) => field.onChange(!!v)}
                      />
                    </Field>
                  </FormControl>

                  {/* Validasyon Hataları */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="col-span-2 w-full self-end items-center flex justify-end gap-3 mt-10">
            <Button type="button" variant="secondary" className="min-w-20" onClick={() => router.push(ROUTES.ADMIN.DASHBOARD)}>
              Vazgeç
            </Button>
            <Button type="submit" className="min-w-20" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <Spinner /> : "Paylaş"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
