"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, FileText, Edit, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";

export default function BlogList({ data, loading }: { data: any; loading: boolean }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleEdit = (blogId: string) => {
    router.push(`${ROUTES.ADMIN.NEW_BLOG}?edit=${blogId}`);
  };

  const handleDelete = async (blogId: string) => {
    setDeleting(blogId);
    try {
      const res = await fetch(`/api/blog/delete?id=${blogId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Blog başarıyla silindi");
        window.location.reload();
      } else {
        toast.error("Blog silinirken hata oluştu");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Sunucu hatası");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Yazılar hazırlanıyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Blog Listesi</h1>
            <p className="text-muted-foreground mt-1">
              Tüm blog yazılarını görüntüleyin ve yönetin
            </p>
          </div>
          <Button onClick={() => router.push(ROUTES.ADMIN.NEW_BLOG)}>
            <FileText className="mr-2 h-4 w-4" />
            Yeni Blog Ekle
          </Button>
        </div>
        <Separator />
      </div>

      {data?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground font-medium mb-2">
              Henüz bir blog yazısı bulunmuyor
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              İlk blog yazınızı oluşturmak için başlayın
            </p>
            <Button onClick={() => router.push(ROUTES.ADMIN.NEW_BLOG)}>
              <FileText className="mr-2 h-4 w-4" />
              Yeni Blog Ekle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-y-auto pb-20 grid gap-4">
          {data.map((blog) => (
            <Card key={blog.id} className="group overflow-hidden shadow-2xs shadow-neutral-200 dark:shadow-neutral-800 hover:shadow-md transition duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row gap-8 px-8 py-2">
                  {/* Thumbnail */}
                  <div className="relative w-full md:w-56 h-40 rounded-lg overflow-hidden bg-muted shrink-0">
                    {blog.thumbnail ? (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-muted-foreground/50" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex flex-nowrap items-center justify-between gap-10 flex-1">
                        <h3 className="text-xl font-semibold line-clamp-1 mb-1">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 -mt-0.5" />
                          <span className="text-sm">
                            {new Date(blog.created_at).toLocaleDateString("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-3">
                      {blog.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
                      <Badge variant="secondary">
                        {blog.category || ""}
                      </Badge>
                      {blog.is_published ? (
                        <Badge className="gap-1.5 border border-primary text-primary bg-primary/10">
                          <Eye className="w-3 h-3" />
                          Yayında
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1.5">
                          <EyeOff className="w-3 h-3" />
                          Taslak
                        </Badge>
                      )}
                      {blog.is_featured && (
                        <Badge className="text-purple-600 bg-purple-600/10 border border-purple-600">
                          Öne Çıkan
                        </Badge>
                      )}
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-neutral/10 text-accent-foreground border border-accent-foreground rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-neutral/10 text-accent-foreground border border-accent-foreground rounded-full">
                            +{blog.tags.length - 3} daha
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(blog.id)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Düzenle
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                            disabled={deleting === blog.id}
                          >
                            {deleting === blog.id ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                            Sil
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Blogu Sil?</AlertDialogTitle>
                            <AlertDialogDescription>
                              <strong>{blog.title}</strong> başlıklı blog yazısı kalıcı olarak
                              silinecektir. Bu işlem geri alınamaz. Devam etmek istediğinize
                              emin misiniz?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer">Vazgeç</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog.id)}
                              className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
                            >
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
