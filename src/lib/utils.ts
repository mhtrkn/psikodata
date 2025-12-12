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

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

export async function serverFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {

  try {
    const res = await fetch(url, {
      ...options,
      method: options?.method || 'GET',
    });

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(`HTTP Hata ${res.status} (${res.statusText}). Detay: ${errorText}`);
    }

    const data: T = await res.json();
    return data;

  } catch (error) {
    console.error(`[Fetcher Hata] ${url} adresinde hata oluştu:`, error);
    throw error;
  }
}

export async function clientFetcher<T>(
  url: string,
  options?: RequestInit
): Promise<T> {

  try {
    const res = await fetch(url, {
      ...options,
      method: options?.method || 'GET',
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: 'Bilinmeyen Hata' }));

      const errorMessage = `HTTP Hata ${res.status} (${res.statusText}). Detay: ${errorData.error || errorData.message || res.statusText}`;

      throw new Error(errorMessage);
    }

    const data: T = await res.json();
    return data;

  } catch (error) {
    console.error(`[Client Fetcher Hata] ${url} adresinde hata oluştu:`, error);
    throw error;
  }
}
