"use client";

import { useSearchParams } from "next/navigation";

export const blogProcess = [
  {
    id: "blog-list",
    name: "Blog Listesi",
    icon: TextAlignStartIcon,
  },
  {
    id: "new-blog",
    name: "Yeni Blog",
    icon: SquarePen,
  },
];

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes";
import clsx from "clsx";
import { ChevronDown, SquarePen, TextAlignStartIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AdminSidebar() {
  const searchParams = useSearchParams();
  const { open } = useSidebar();
  const activeTab = searchParams.get("activeTab") ?? "dashboard";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger className="flex items-center justify-between flex-1 py-2">
                Blog İşlemleri
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="mt-2">
                <SidebarMenu className="flex flex-col gap-2">
                  {blogProcess.map((process) => {
                    const isActive = activeTab === process.id;

                    return (
                      <SidebarMenuItem key={process.id}>
                        <SidebarMenuButton
                          asChild
                          className={clsx(
                            "transition-colors px-4 py-2.5 h-fit",
                            isActive && "bg-primary text-neutral-950"
                          )}
                        >
                          <Link href={`${ROUTES.ADMIN.DASHBOARD}?activeTab=${process.id}`} className="flex items-center gap-2.5">
                            <process.icon />
                            <span>{process.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup />
      </SidebarContent>

      {
        open && (
          <SidebarFooter className="w-full flex-center flex-col p-4">
            <Image src={'/icons/clover.png'} alt="Kolay Gelsin" width={74} height={74} className="opacity-20 dark:opacity-10" />
            <span className="text-2xl font-medium text-neutral-200 dark:text-neutral-800">
              KOLAY GELSİN
            </span>
          </SidebarFooter>
        )}
    </Sidebar>
  )
}
