"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/routes";
import { blogService } from "@/services/blog-service";
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  Plus,
  LayoutDashboard,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface DashboardStats {
  totalBlogs: number;
  publishedBlogs: number;
  draftBlogs: number;
  totalAuthors: number;
  featuredBlogs: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalAuthors: 0,
    featuredBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const blogs = await blogService.getAll();

        const authorsRes = await fetch("/api/authors/get-all");
        const authorsData = await authorsRes.json();
        const authors = authorsData?.authors ?? authorsData ?? [];

        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter((b: any) => b.is_published).length,
          draftBlogs: blogs.filter((b: any) => !b.is_published).length,
          totalAuthors: authors.length,
          featuredBlogs: blogs.filter((b: any) => b.is_featured).length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Toplam Blog",
      value: stats.totalBlogs,
      icon: FileText,
      description: "Tüm bloglar",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-500/15",
      cardClass: "bg-blue-50/50 border border-blue-300 dark:bg-blue-950 dark:border-blue-500"
    },
    {
      title: "Yayınlanan",
      value: stats.publishedBlogs,
      icon: Eye,
      description: "Aktif bloglar",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-500/15",
      cardClass: "bg-green-50/50 border border-green-300 dark:bg-green-950 dark:border-green-500"
    },
    {
      title: "Taslak",
      value: stats.draftBlogs,
      icon: FileText,
      description: "Yayınlanmamış",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-500/15",
      cardClass: "bg-orange-50/50 border border-orange-300 dark:bg-orange-950 dark:border-orange-500"
    },
    {
      title: "Öne Çıkanlar",
      value: stats.featuredBlogs,
      icon: TrendingUp,
      description: "Featured bloglar",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-500/15",
      cardClass: "bg-purple-50/50 border border-purple-300 dark:bg-purple-950 dark:border-purple-500"
    },
    {
      title: "Toplam Yazar",
      value: stats.totalAuthors,
      icon: Users,
      description: "Kayıtlı yazarlar",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-500/15",
      cardClass: "bg-indigo-50/50 border border-indigo-300 dark:bg-indigo-950 dark:border-indigo-500"
    },
  ];

  const quickActions = [
    {
      title: "Yeni Blog Oluştur",
      description: "Hemen yeni bir blog yazısı ekleyin",
      href: ROUTES.ADMIN.NEW_BLOG,
      icon: Plus,
    },
    {
      title: "Blog Listesi",
      description: "Tüm blogları görüntüle ve düzenle",
      href: ROUTES.ADMIN.BLOGS,
      icon: FileText,
    },
    {
      title: "Yazarlar",
      description: "Yazar listesini yönet",
      href: ROUTES.ADMIN.AUTHORS,
      icon: Users,
    },
    {
      title: "Sayfa Ayarları",
      description: "Hero section ve diğer sayfaları düzenle",
      href: ROUTES.ADMIN.PAGES.HERO,
      icon: LayoutDashboard,
    },
  ];

  return (
    <div className="flex-1 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Admin panelinize hoş geldiniz. İşte genel bakış.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`overflow-hidden ${card?.cardClass ?? ''}`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "..." : card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Hızlı İşlemler</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.title} href={action.href}>
                <Card className="group hover:shadow-md transition-all cursor-pointer h-full">
                  <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                    <CardTitle className="text-base">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
