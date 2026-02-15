import AdminNavbar from "@/components/layout/admin/admin-navbar";
import { AdminSidebar } from "@/components/layout/admin/admin-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex flex-1 flex-col min-h-dvh relative w-full">
          <AdminNavbar />
          <div className="flex-1 p-8 bg-accent dark:bg-accent">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </React.Fragment>
  );
}
