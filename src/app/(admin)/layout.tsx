import AdminProviders from "@/components/layout/admin/admin-providers";
import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "psikodata | Admin Paneli",
  description: "Modern Next.js Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className="min-h-screen bg-card text-card-foreground font-sans"
      >
        <AdminProviders>
          {children}
        </AdminProviders>
      </body>
    </html>
  );
}
