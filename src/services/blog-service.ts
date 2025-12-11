/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";

export interface BlogPayload {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail?: string;
  category?: string;
  tags?: string[];
  isPublished?: boolean;
}

export const blogService = {
  // ------------------------------------------------------
  // BLOG OLUŞTURMA
  // ------------------------------------------------------
  create: async (payload: BlogPayload): Promise<boolean> => {
    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Blog başarıyla oluşturuldu!", {
          description: "Yeni blog yayına hazır.",
        });
        return true;
      }

      toast.error("Blog oluşturulamadı!", {
        description: data?.error || "Beklenmeyen bir hata oluştu.",
      });
      return false;

    } catch (err) {
      toast.error("Sunucu hatası!", {
        description: "Blog oluşturulurken bir hata oluştu.",
      });
      return false;
    }
  },

  // ------------------------------------------------------
  // TÜM BLOGLARI GETİRME
  // ------------------------------------------------------
  getAll: async () => {
    try {
      const res = await fetch("/api/blog/list");
      const data = await res.json();

      if (res.ok) return data.blogs;

      toast.error("Bloglar alınamadı!", {
        description: data?.error || "Sunucu kaynaklı bir hata oluştu.",
      });
      return [];
    } catch (err) {
      toast.error("Sunucu hatası!", {
        description: "Blog listesi alınırken hata oluştu.",
      });
      return [];
    }
  },

  // ------------------------------------------------------
  // TEK BLOG GETİRME
  // ------------------------------------------------------
  getBySlug: async (slug: string) => {
    try {
      const res = await fetch(`/api/blog/${slug}`);
      const data = await res.json();

      if (res.ok) return data.blog;

      toast.error("Blog bulunamadı!", {
        description: data?.error || "Aradığınız blog mevcut değil.",
      });
      return null;
    } catch (err) {
      toast.error("Sunucu hatası!", {
        description: "Blog getirilirken bir hata oluştu.",
      });
      return null;
    }
  },

  // ------------------------------------------------------
  // BLOG GÜNCELLEME
  // ------------------------------------------------------
  update: async (slug: string, payload: Partial<BlogPayload>): Promise<boolean> => {
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Blog güncellendi!", {
          description: "Değişiklikler başarıyla kaydedildi.",
        });
        return true;
      }

      toast.error("Güncellenemedi!", {
        description: data?.error || "Bir hata oluştu.",
      });
      return false;

    } catch (err) {
      toast.error("Sunucu hatası!", {
        description: "Güncelleme sırasında hata oluştu.",
      });
      return false;
    }
  },

  // ------------------------------------------------------
  // BLOG SİLME
  // ------------------------------------------------------
  delete: async (slug: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      const data = await res.json();

      if (res.ok) {
        toast.success("Blog silindi", {
          description: "Blog başarıyla kaldırıldı.",
        });
        return true;
      }

      toast.error("Silinemedi!", {
        description: data?.error || "Sunucu hatası nedeniyle silinemedi.",
      });
      return false;

    } catch (err) {
      toast.error("Sunucu hatası!", {
        description: "Blog silinirken bir hata oluştu.",
      });
      return false;
    }
  },
  uploadThumbnail: async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/upload/thumbnail", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok && data?.url) {
      return data.url;
    }

    return null;
  },
};
