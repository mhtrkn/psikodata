/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from "sonner";

interface LoginData {
  username: string;
  pin: string;
}

export const authService = {
  login: async ({ username, pin }: LoginData): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pin }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Giriş yapıldı! 👋", {
          description: "Hoşgeldiniz! Admin paneline yönlendiriliyorsunuz.",
        });
        return true;
      } else {
        toast.error("Giriş başarısız!", {
          description: data?.message || "ID veya PIN hatalı. Lütfen tekrar deneyin.",
        });
        return false;
      }
    } catch (err) {
      toast.error("Giriş başarısız!", {
        description: "Sunucu hatası. Lütfen tekrar deneyin.",
      });
      return false;
    }
  },

  logout: async (): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });

      toast.success("Çıkış yapıldı! 👋", {
        description: "Artık admin paneline erişiminiz yok. Güvenli bir şekilde çıkış yaptınız.",
      });

      return res.ok;
    } catch (err) {
      console.error("Logout hatası:", err);

      toast.error("Çıkış yapılamadı!", {
        description: "Sunucu hatası nedeniyle çıkış işlemi başarısız oldu. Lütfen tekrar deneyin.",
      });

      return false;
    }
  }
};
