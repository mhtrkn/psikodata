"use client";

export const blogProcess = [
  {
    id: 0,
    name: "Yeni Blog",
    url: "/admin/blog/create",
    icon: PencilLineIcon,
  },
  {
    id: 1,
    name: "Blog Listesi",
    url: "/admin/blog/list",
    icon: FileTextIcon,
  },
];

import {
  Avatar,
  AvatarImage
} from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle
} from "@/components/ui/item";
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
import { authService } from "@/services/admin-service";
import clsx from "clsx";
import { ChevronDown, FileTextIcon, HomeIcon, PencilIcon, PencilLineIcon, SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminSidebar() {
  const router = useRouter();
  const { open } = useSidebar()
  const isCollapsed = !open;

  const Logout = async () => {
    await authService.logout();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <Sidebar variant="floating" collapsible="icon">
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
                  {blogProcess.map((process) => (
                    <SidebarMenuItem key={process.id}>
                      <SidebarMenuButton asChild>
                        <a href={process.url}>
                          <process.icon />
                          <span>{process.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Item variant={isCollapsed ? 'default' : 'muted'} className={clsx("flex-center py-2", isCollapsed && 'p-0 mb-4')}>
              <ItemMedia>
                <Avatar className={clsx("size-10", isCollapsed && 'size-6')}>
                  <AvatarImage src="https://github.com/evilrabbit.png" />
                </Avatar>
              </ItemMedia>

              {!isCollapsed && (
                <ItemContent>
                  <ItemTitle>Rabia Betül Şahin</ItemTitle>
                </ItemContent>
              )}
            </Item>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={Logout}>
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
