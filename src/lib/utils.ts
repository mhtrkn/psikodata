import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffMinutes = Math.floor(diff / (1000 * 60))
  const diffHours = Math.floor(diff / (1000 * 60 * 60))
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffMinutes < 5) return "Az önce"
  if (diffMinutes < 60) return `${diffMinutes} dk önce`
  if (diffHours < 24) return `${diffHours} saat önce`
  if (diffDays < 7) return `${diffDays} gün önce`
  if (diffWeeks < 5) return `${diffWeeks} hafta önce`
  if (diffMonths < 12) return `${diffMonths} ay önce`
  return `${diffYears} yıl önce`
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);

  const aylar = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const gun = date.getDate().toString().padStart(2, "0");
  const ay = aylar[date.getMonth()];
  const yil = date.getFullYear();

  return `${gun} ${ay} ${yil}`;
}
