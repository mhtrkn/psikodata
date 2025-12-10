"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { ROUTES } from '@/routes';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import React from "react";
import Search from '../theme/navbar-search';
import ThemeToggle from '../theme/theme-toggle';

function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <nav className="px-4 xl:px-0 w-full bg-card text-card-foreground border-b border-b-neutral-100 dark:border-b-neutral-800">
      <div className="container mx-auto flex items-center justify-between py-5">
        <Link href={ROUTES.HOME} className="text-4xl font-bold text-primary">psikodata.</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href={ROUTES.BLOG} className="hover:opacity-70">Blog</Link>
          <Link href={ROUTES.ABOUT} className="hover:opacity-70">Hakkında</Link>
          <Link href={ROUTES.CONTACT} className="hover:opacity-70">İletişim</Link>
          <ThemeToggle />
          <Search />
        </div>

        <div className="block md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant={'ghost'}>
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
