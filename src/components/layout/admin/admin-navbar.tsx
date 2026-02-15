"use client";

import ThemeToggle from '@/components/theme/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ROUTES } from '@/routes';
import { authService } from '@/services/admin-service';
import { BellIcon, PanelsTopLeft, RefreshCcwIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const pathNameMap: Record<string, string> = {
  [ROUTES.ADMIN.DASHBOARD]: "Dashboard",
  [ROUTES.ADMIN.BLOGS]: "Blog Listesi",
  [ROUTES.ADMIN.NEW_BLOG]: "Yeni Blog Ekle",
  [ROUTES.ADMIN.AUTHORS]: "Yazarlar",
  [ROUTES.ADMIN.PAGES.HERO]: "Hero Section",
  [ROUTES.ADMIN.PAGES.ABOUT]: "Hakkımızda",
  [ROUTES.ADMIN.PAGES.CONTACT]: "İletişim",
};

function AdminNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    const paths = pathname.split('/').filter(Boolean);
    const crumbs: { label: string; href: string; isLast: boolean }[] = [];

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === paths.length - 1;

      if (currentPath === '/admin') return;

      const label = pathNameMap[currentPath] || path.charAt(0).toUpperCase() + path.slice(1);

      crumbs.push({
        label,
        href: currentPath,
        isLast,
      });
    });

    return crumbs;
  }, [pathname]);

  const Logout = async () => {
    await authService.logout();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className='sticky z-10 bg-card top-0 w-full border-b border-b-neutral-200 dark:border-b-neutral-800'>
      <div className='flex items-center justify-between w-full px-4 py-3'>
        <div className='flex items-center gap-3'>
          <SidebarTrigger>
            <PanelsTopLeft />
          </SidebarTrigger>
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage className="font-medium">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='flex gap-3 items-center justify-end'>
          <ThemeToggle />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'ghost'} size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0 w-80'>
              <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BellIcon />
                  </EmptyMedia>
                  <EmptyTitle>Bildirim Yok</EmptyTitle>
                  <EmptyDescription>
                    Yeni bildirimler burada görünecek.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button variant="outline" size="sm">
                    <RefreshCcwIcon />
                    Yenile
                  </Button>
                </EmptyContent>
              </Empty>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className='cursor-pointer'>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="Admin"
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={Logout} className="cursor-pointer">
                Çıkış Yap
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
