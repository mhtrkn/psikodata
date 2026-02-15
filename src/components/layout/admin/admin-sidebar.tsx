"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

import { ROUTES } from "@/routes";
import clsx from "clsx";

import {
  ChevronDown,
  FileText,
  LayoutDashboard,
  Users,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    href: ROUTES.ADMIN.DASHBOARD,
  },
  {
    id: "blogs",
    name: "Blog Yönetimi",
    icon: FileText,
    items: [
      {
        id: "blog-list",
        name: "Blog Listesi",
        href: ROUTES.ADMIN.BLOGS,
      },
      {
        id: "new-blog",
        name: "Yeni Blog Ekle",
        href: ROUTES.ADMIN.NEW_BLOG,
      },
    ],
  },
  {
    id: "authors",
    name: "Yazar Yönetimi",
    icon: Users,
    href: ROUTES.ADMIN.AUTHORS,
  },
  {
    id: "pages",
    name: "Sayfa Yönetimi",
    icon: LayoutDashboard,
    items: [
      {
        id: "hero",
        name: "Hero Section",
        href: ROUTES.ADMIN.PAGES.HERO,
      },
      {
        id: "about",
        name: "Hakkımızda",
        href: ROUTES.ADMIN.PAGES.ABOUT,
      },
      {
        id: "contact",
        name: "İletişim",
        href: ROUTES.ADMIN.PAGES.CONTACT,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  const isActive = (href: string) => pathname === href;

  const isParentActive = (items?: { href: string }[]) =>
    items?.some((item) => pathname === item.href);

  const baseItemStyle =
    "flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors";

  const activeStyle =
    "bg-primary text-primary-foreground hover:bg-primary";

  const normalStyle =
    "hover:bg-accent text-muted-foreground hover:text-foreground";

  return (
    <Sidebar collapsible="icon">
      {/* Header */}
      <SidebarHeader className="border-b border-border p-4">
        {open && (
          <Link
            href={ROUTES.ADMIN.DASHBOARD}
            className="text-lg font-semibold text-primary"
          >
            psikodata.
          </Link>
        )}
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="p-3">
        <SidebarMenu className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            /* ---------- DROPDOWN ITEM ---------- */
            if (item.items) {
              return (
                <Collapsible
                  key={item.id}
                  defaultOpen={isParentActive(item.items)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <button
                        className={clsx(
                          baseItemStyle,
                          normalStyle
                        )}
                      >
                        <item.icon className="w-4 h-4" />

                        <span className="flex-1 text-left">
                          {item.name}
                        </span>

                        <ChevronDown className="w-4 h-4 transition-transform data-[state=open]:rotate-180" />
                      </button>
                    </CollapsibleTrigger>
                  </SidebarMenuItem>

                  <CollapsibleContent>
                    <div className="ml-6 mt-1 flex flex-col gap-1">
                      {item.items.map((sub) => (
                        <SidebarMenuItem key={sub.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={sub.href}
                              className={clsx(
                                baseItemStyle,
                                "py-2",
                                isActive(sub.href)
                                  ? activeStyle
                                  : normalStyle
                              )}
                            >
                              <span>{sub.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            /* ---------- NORMAL ITEM ---------- */
            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href!}
                    className={clsx(
                      baseItemStyle,
                      isActive(item.href!)
                        ? activeStyle
                        : normalStyle
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
