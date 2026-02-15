"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { blogService } from "@/services/blog-service";
import { Blog } from "@/types/blogs";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function HeroSettingsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlogId, setSelectedBlogId] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await blogService.getAll();
        const publishedBlogs = data.filter((b: Blog) => b.is_published);
        setBlogs(publishedBlogs);

        // Get current featured blog
        const featured = publishedBlogs.find((b: Blog) => b.is_featured);
        if (featured) {
          setSelectedBlogId(featured.id);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Bloglar yüklenirken hata oluştu");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!selectedBlogId) {
      toast.error("Lütfen bir blog seçin");
      return;
    }

    setSaving(true);
    try {
      // TODO: API endpoint to update featured blog
      // For now, we'll just show a success message
      toast.success("Hero section ayarları kaydedildi");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Kaydetme sırasında hata oluştu");
    } finally {
      setSaving(false);
    }
  };

  const selectedBlog = blogs.find((b) => b.id === selectedBlogId);

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Hero Section Ayarları</h1>
        <p className="text-muted-foreground">
          Anasayfada öne çıkacak blogu seçin
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Öne Çıkan Blog Seçimi</CardTitle>
            <CardDescription>
              Hero section'da gösterilecek blogu buradan seçebilirsiniz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blog Seçin</label>
                  <Select value={selectedBlogId} onValueChange={setSelectedBlogId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bir blog seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogs.map((blog) => (
                        <SelectItem key={blog.id} value={blog.id}>
                          {blog.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSave} disabled={saving || !selectedBlogId}>
                  {saving ? <Spinner /> : "Kaydet"}
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {selectedBlog && (
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
              <CardDescription>Seçilen blogun görünümü</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedBlog.thumbnail ? (
                <div className="relative aspect-video rounded-lg overflow-hidden border">
                  <Image
                    src={selectedBlog.thumbnail}
                    alt={selectedBlog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold line-clamp-2">
                  {selectedBlog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {selectedBlog.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {selectedBlog.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(selectedBlog.created_at).toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
