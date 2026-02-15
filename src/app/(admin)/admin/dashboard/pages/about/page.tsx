"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function AboutPageSettings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Hakkımızda",
    subtitle: "Biz kimiz ve ne yapıyoruz?",
    content: "",
    mission: "",
    vision: "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: API endpoint to save about page content
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Hakkımızda sayfası güncellendi");
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Kaydetme sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Hakkımızda Sayfası</h1>
        <p className="text-muted-foreground">
          Hakkımızda sayfasının içeriğini düzenleyin
        </p>
      </div>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Sayfa İçeriği</CardTitle>
          <CardDescription>
            Hakkımızda sayfasında görünecek bilgileri girin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Hakkımızda"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Alt Başlık</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Biz kimiz ve ne yapıyoruz?"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Ana İçerik</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Hakkımızda sayfasının ana içeriğini buraya yazın..."
              className="min-h-[200px]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mission">Misyonumuz</Label>
              <Textarea
                id="mission"
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                placeholder="Misyonunuzu yazın..."
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision">Vizyonumuz</Label>
              <Textarea
                id="vision"
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                placeholder="Vizyonunuzu yazın..."
                className="min-h-[120px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Önizleme</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? <Spinner /> : "Kaydet"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
