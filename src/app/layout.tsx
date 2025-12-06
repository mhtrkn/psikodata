import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Kumbh_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";

const kumbh = Kumbh_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-kumbh" });

export const metadata: Metadata = {
  title: "psikodata | Blog Sitesi",
  description: "Modern Next.js Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body
        className={`${kumbh.variable} min-h-screen grid grid-rows-[auto_1fr_auto] bg-card text-card-foreground font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="container bg-card text-card-foreground mx-auto grid grid-cols-12 auto-rows-min gap-6 py-6">
            {children}
          </main>
          <Footer />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
