import AdminNavbar from "@/components/layout/admin/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AdminSidebar />
        <main className="relative w-full">
          <AdminNavbar />
          <div className="flex-1 p-8 h-full bg-neutral-100 dark:bg-neutral-950/40">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </React.Fragment>
  );
}
