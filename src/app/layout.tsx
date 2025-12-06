import Providers from "@/components/layout/providers";
import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbh = Kumbh_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-kumbh" });

export const metadata: Metadata = {
  title: "psikodata | Blog Sitesi",
  description: "Modern Next.js Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="light" style={{ colorScheme: "light" }}>
      <body
        className={`${kumbh.variable} min-h-screen grid grid-rows-[auto_1fr_auto] bg-card text-card-foreground font-sans`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
