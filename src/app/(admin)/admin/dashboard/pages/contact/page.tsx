"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPageSettings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "İletişim",
    subtitle: "Bizimle iletişime geçin",
    description: "",
    email: "",
    phone: "",
    address: "",
    mapUrl: "",
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: API endpoint to save contact page content
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("İletişim sayfası güncellendi");
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
        <h1 className="text-3xl font-bold tracking-tight">İletişim Sayfası</h1>
        <p className="text-muted-foreground">
          İletişim sayfasının içeriğini ve bilgilerini düzenleyin
        </p>
      </div>

      <Separator />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Genel Bilgiler</CardTitle>
              <CardDescription>
                İletişim sayfasının başlık ve açıklama bilgileri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="İletişim"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Alt Başlık</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Bizimle iletişime geçin"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="İletişim sayfası açıklaması..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
              <CardDescription>
                E-posta, telefon ve adres bilgilerini girin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  E-posta
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@psikodata.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Telefon
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 (555) 123 45 67"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Adres
                </Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="İstanbul, Türkiye"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mapUrl">Harita Embed URL (opsiyonel)</Label>
                <Input
                  id="mapUrl"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Önizleme</Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? <Spinner /> : "Kaydet"}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Önizleme</CardTitle>
              <CardDescription>İletişim bilgilerinin görünümü</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {formData.email && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">E-posta</p>
                      <p className="text-sm break-all">{formData.email}</p>
                    </div>
                  </div>
                )}

                {formData.phone && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Telefon</p>
                      <p className="text-sm">{formData.phone}</p>
                    </div>
                  </div>
                )}

                {formData.address && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Adres</p>
                      <p className="text-sm">{formData.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
