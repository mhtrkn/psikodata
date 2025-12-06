'use client';

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { DialogContent } from "@radix-ui/react-dialog";
import { ROUTES } from "@/routes";

const recentSearches = [
  "Depresyon belirtileri",
  "Stresle başa çıkma yöntemleri",
  "Anksiyete testleri",
  "Mindfulness teknikleri",
  "Psikolojik iyileşme hikayeleri",
  "Duygusal zekayı geliştirme",
  "Uyku ve psikoloji ilişkisi"
];

const popularSearches = [
  "Kaygı bozukluğu nedir?",
  "Depresyonla baş etme yolları",
  "Mindfulness meditasyonu",
  "Stres yönetimi teknikleri",
  "Motivasyon artırma yöntemleri",
  "Ruh sağlığı için kitap önerileri",
  "Duygusal zekayı geliştirme"
];

function Search() {
  const [isOpen, setOpen] = useState(false)

  const toggleSearch = () => {
    setOpen((prev) => !prev)
  }

  return (
    <>
      <Button variant="ghost" onClick={toggleSearch}>
        <SearchIcon />
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setOpen} className="rounded-lg border shadow-md md:min-w-[450px] md:min-h-[360px]">
        <CommandInput placeholder="Ne aramak istiyorsun? Örn: depresyon belirtileri" />
        <CommandList>
          <CommandEmpty>
            <Empty>
              <EmptyHeader>
                <EmptyTitle>İçerik Bulunamadı</EmptyTitle>
                <EmptyDescription>
                  Aradığınız sayfa bulunamadı. Aşağıdan arama yapabilirsiniz.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <EmptyDescription>
                  Yardım için <a href={ROUTES.CONTACT}>buraya tıklayın</a>.
                </EmptyDescription>
              </EmptyContent>
            </Empty>
          </CommandEmpty>

          <CommandGroup heading="Geçmiş Aramalar" className="mt-1">
            <CommandSeparator className="mb-2" />
            {recentSearches.map((item, index) => (
              <CommandItem className="text-sm text-neutral-700 dark:text-neutral-300" key={index}>{item}</CommandItem>
            ))}
          </CommandGroup>


          <CommandGroup heading="Popüler Aramalar">
            <CommandSeparator className="mb-2" />
            {popularSearches.map((item, index) => (
              <CommandItem className="text-sm text-neutral-700 dark:text-neutral-300" key={index}>{item}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default Search
