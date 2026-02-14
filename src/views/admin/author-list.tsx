"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, Loader2 } from "lucide-react";
import { AuthorType } from "@/types/authors";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AuthorCard } from "@/components/author/author-card";

export default function AuthorList() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [isOpen, setIsOpen] = useState(false); // Drawer kontrolü

  // 1. Yazarları API'den Çekme Fonksiyonu
  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/authors/get-all");
      const data = await res.json();
      if (res.ok) {
        setAuthors(data);
      }
    } catch (error) {
      toast.error("Yazarlar yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Sayfa ilk açıldığında yazarları getir
  useEffect(() => {
    fetchAuthors();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !role) return toast.error("Lütfen tüm alanları doldurun.");

    const res = await fetch("/api/authors/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
    });

    if (res.ok) {
      toast.success("Yazar eklendi.");
      setName("");
      setRole("");
      setIsOpen(false); // Kayıttan sonra drawer'ı kapat
      fetchAuthors(); // Listeyi güncelle!
    } else {
      toast.error("Bir hata oluştu");
    }
  }

  // 3. Yazar Silme Fonksiyonu (Card bileşeni için)
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/authors/delete?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Yazar silindi.");
      fetchAuthors(); // Listeyi güncelle
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium text-card-foreground">Yazar Listesi</h1>

          <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <PlusIcon className="h-4 w-4" />
                Ekle
              </Button>
            </DrawerTrigger>

            <DrawerContent className="fixed right-0 top-0 bottom-0 mt-0 w-full sm:w-[450px] h-full rounded-l-xl rounded-r-none">
              <div className="mx-auto w-full h-full flex flex-col">
                <DrawerHeader className="border-b pb-6">
                  <DrawerTitle className="text-2xl">Yazar Ekle</DrawerTitle>
                  <DrawerDescription>Sisteme yeni bir yazar tanımlayın.</DrawerDescription>
                </DrawerHeader>

                <form onSubmit={handleSubmit} className="flex-1 px-6 space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Yazar Adı</Label>
                    <Input id="name" placeholder="Rabia Betül Şahin" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Ünvan</Label>
                    <Input id="role" placeholder="Uzm. Psikolog" value={role} onChange={(e) => setRole(e.target.value)} />
                  </div>
                  <button type="submit" className="hidden" />
                </form>

                <DrawerFooter className="border-t bg-muted/20 p-6">
                  <Button onClick={handleSubmit}>Kaydet</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">İptal</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <Separator />
      </div>

      {/* 4. Yazarların Listelendiği Grid Alanı */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin mb-2" />
          <p>Yazarlar yükleniyor...</p>
        </div>
      ) : authors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground">Henüz yazar eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
