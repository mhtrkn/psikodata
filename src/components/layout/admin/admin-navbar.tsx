"use client";

import ThemeToggle from '@/components/theme/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ROUTES } from '@/routes';
import { authService } from '@/services/admin-service';
import { BellIcon, PanelsTopLeft, RefreshCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AdminNavbar() {
  const router = useRouter();

  const Logout = async () => {
    await authService.logout();
    router.push(ROUTES.ADMIN.LOGIN);
  };

  return (
    <div className='sticky z-10 bg-card top-0 flex items-center justify-between w-full pr-8 pl-2 py-2 border-b border-b-neutral-200 dark:border-b-neutral-800'>
      <SidebarTrigger>
        <PanelsTopLeft />
      </SidebarTrigger>

      <div className='flex gap-4 items-center justify-end'>
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'ghost'}>
              <BellIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='p-0'>
            <Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30%">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <BellIcon />
                </EmptyMedia>
                <EmptyTitle>No Notifications</EmptyTitle>
                <EmptyDescription>
                  You&apos;re all caught up. New notifications will appear here.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  <RefreshCcwIcon />
                  Refresh
                </Button>
              </EmptyContent>
            </Empty>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className='ml-2'>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={Logout}>
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AdminNavbar
