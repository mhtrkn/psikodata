"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { TextareaDemo } from "@/components/theme/text-area";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { TagInput } from "@/components/ui/tag-input";
import { slugify } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { blogService } from "@/services/blog-service";

const blogSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalı"),
  slug: z.string().min(3, "Slug en az 3 karakter olmalı"),
  excerpt: z.string().min(10, "Özet en az 10 karakter olmalı"),
  content: z.string().min(20, "İçerik en az 20 karakter olmalı"),
  thumbnail: z.string(),
  thumbnailFile: z.any().optional(),
  category: z.string().min(2, "Kategori zorunlu"),
  tags: z.array(z.string()).optional(),
  is_published: z.boolean().optional(),
  author_id: z.string().uuid("Geçerli bir yazar seçin"),
  is_featured: z.boolean().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

export default function NewBlogForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
      is_published: true,
      author_id: "",
      is_featured: false
    },
  });

  // Fetch authors
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

  // Fetch blog data for editing
  useEffect(() => {
    if (!editId) return;

    setIsEditMode(true);
    setLoadingBlog(true);

    (async () => {
      try {
        const res = await fetch(`/api/blog/get-by-id?id=${editId}`);
        if (!res.ok) throw new Error("Blog yüklenemedi");

        const data = await res.json();
        const blog = data.blog;

        // Populate form with blog data
        form.reset({
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          thumbnail: blog.thumbnail || "",
          thumbnailFile: undefined,
          category: blog.category,
          tags: blog.tags || [],
          is_published: blog.is_published ?? true,
          author_id: blog.author_id,
          is_featured: blog.is_featured ?? false,
        });
      } catch (err) {
        console.error(err);
        toast.error("Blog yüklenirken hata oluştu");
        router.push(ROUTES.ADMIN.BLOGS);
      } finally {
        setLoadingBlog(false);
      }
    })();
  }, [editId, form, router]);

  useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      const title = values.title;
      const slug = values.slug;

      if (name === "slug" && slug) return;

      if (name === "title" && title) {
        const generated = slugify(title);

        if (generated.length < 3) return;

        form.setValue("slug", generated, {
          shouldValidate: false,
          shouldDirty: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);


  async function onSubmit(values: BlogFormValues) {
    try {
      let thumbnailUrl = values.thumbnail;

      // Only upload if a new file is selected
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
        is_featured: !!values.is_featured,
      };

      const endpoint = isEditMode ? "/api/blog/update" : "/api/blog/create";
      const res = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditMode ? { ...payload, id: editId } : payload),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          isEditMode ? "Blog güncellenemedi" : "Blog oluşturulamadı",
          { description: data?.error ?? "Sunucu hatası" }
        );
        return;
      }

      toast.success(isEditMode ? "Blog başarıyla güncellendi" : "Blog başarıyla oluşturuldu");
      router.push(ROUTES.ADMIN.BLOGS);
    } catch (err) {
      console.error("blog operation error:", err);
      toast.error("Sunucu hatası: İşlem tamamlanamadı");
    }
  }

  if (loadingBlog) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Spinner />
        <p className="mt-4">Blog yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium text-card-foreground">
          {isEditMode ? "Blog Düzenle" : "Yeni Blog Oluştur"}
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
                          Bu ayarı etkinleştirdiğinizde, blog kaydedildiği anda yayına alınır.
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

            {/* Featured */}
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Field orientation="horizontal" className="items-center justify-between">

                      {/* Sol Taraf */}
                      <FieldContent>
                        <FieldLabel htmlFor="is_featured_switch">
                          Öne çıkarılsın mı?
                        </FieldLabel>
                        <FieldDescription className="max-w-2/3 text-sm">
                          Bu ayar bloğu anasayfada öne çıkarır.
                        </FieldDescription>
                      </FieldContent>

                      {/* Sağ Taraf (Switch) */}
                      <Switch
                        id="is_featured_switch"
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
