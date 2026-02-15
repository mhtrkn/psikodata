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
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<AuthorType | null>(null);

  // Fetch authors
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

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Add or update author
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !role) return toast.error("Lütfen tüm alanları doldurun.");

    const endpoint = editingAuthor ? "/api/authors/update" : "/api/authors/add";
    const method = editingAuthor ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        editingAuthor ? { id: editingAuthor.id, name, role } : { name, role }
      ),
    });

    if (res.ok) {
      toast.success(editingAuthor ? "Yazar güncellendi." : "Yazar eklendi.");
      setName("");
      setRole("");
      setEditingAuthor(null);
      setIsOpen(false);
      fetchAuthors();
    } else {
      toast.error("Bir hata oluştu");
    }
  }

  // Delete author
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/authors/delete?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Yazar silindi.");
      fetchAuthors();
    }
  };

  // Edit author
  const handleEdit = (author: AuthorType) => {
    setEditingAuthor(author);
    setName(author.name);
    setRole(author.role);
    setIsOpen(true);
  };

  // Close drawer and reset form
  const handleCloseDrawer = () => {
    setIsOpen(false);
    setTimeout(() => {
      setEditingAuthor(null);
      setName("");
      setRole("");
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Yazar Yönetimi</h1>
            <p className="text-muted-foreground mt-1">
              Yazarları ekleyin, düzenleyin veya silin
            </p>
          </div>

          <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button className="gap-2 shadow-sm">
                <PlusIcon className="h-4 w-4" />
                Yeni Yazar Ekle
              </Button>
            </DrawerTrigger>

            <DrawerContent className="fixed right-0 top-0 bottom-0 mt-0 w-full sm:w-[450px] h-full rounded-l-xl rounded-r-none">
              <div className="mx-auto w-full h-full flex flex-col">
                <DrawerHeader className="border-b pb-6">
                  <DrawerTitle className="text-2xl">
                    {editingAuthor ? "Yazar Düzenle" : "Yazar Ekle"}
                  </DrawerTitle>
                  <DrawerDescription>
                    {editingAuthor
                      ? "Yazar bilgilerini güncelleyin"
                      : "Sisteme yeni bir yazar tanımlayın"}
                  </DrawerDescription>
                </DrawerHeader>

                <form onSubmit={handleSubmit} className="flex-1 px-6 space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Yazar Adı</Label>
                    <Input
                      id="name"
                      placeholder="Rabia Betül Şahin"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Ünvan</Label>
                    <Input
                      id="role"
                      placeholder="Uzm. Psikolog"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="hidden" />
                </form>

                <DrawerFooter className="border-t bg-muted/20 p-6">
                  <Button onClick={handleSubmit}>
                    {editingAuthor ? "Güncelle" : "Kaydet"}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline" onClick={handleCloseDrawer}>
                      İptal
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <Separator />
      </div>

      {/* Authors Grid */}
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
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-muted-foreground font-medium mb-2">Henüz yazar eklenmemiş</p>
          <p className="text-sm text-muted-foreground mb-4">
            İlk yazarınızı eklemek için başlayın
          </p>
          <Button onClick={() => setIsOpen(true)} className="gap-2">
            <PlusIcon className="h-4 w-4" />
            Yeni Yazar Ekle
          </Button>
        </div>
      )}
    </div>
  );
}
