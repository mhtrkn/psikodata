"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NewAuthors() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("writer");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/authors/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role })
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Yazar eklendi.");
    } else {
      toast.error(data.message || "Bir hata oluştu");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-[400px]"
    >
      <Label>Yazar Adı</Label>
      <Input value={name} onChange={(e) => setName(e.target.value)} />

      <Label>Rol</Label>
      <Input value={role} onChange={(e) => setRole(e.target.value)} />

      <Button type="submit" className="mt-4">
        Yazar Ekle
      </Button>
    </form>
  );
}
