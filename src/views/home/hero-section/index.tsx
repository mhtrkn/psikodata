"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Sparkles, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export default function HeroSection({
  title = "psikodata.",
  subtitle = "",
  description = "",
  primaryButtonText = "Keşfetmeye Başla",
  primaryButtonUrl = "/blog",
  secondaryButtonText = "Hakkımızda",
  secondaryButtonUrl = "/about"
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="relative col-span-12 w-full overflow-hidden">
      {/* Content */}
      <div className="relative flex flex-col items-center justify-center text-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 animate-fade-in">
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm font-medium flex items-center gap-2 backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-neutral-200/50 dark:border-neutral-800/50"
          >
            <Sparkles className="w-4 h-4" />
            Yeni içerikler her hafta
          </Badge>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-neutral-600 dark:text-neutral-400 mb-6 animate-fade-in-up [animation-delay:200ms]">
          {subtitle}
        </p>

        {/* Description */}
        <p className="max-w-2xl text-base sm:text-lg text-neutral-500 dark:text-neutral-500 mb-10 leading-relaxed animate-fade-in-up [animation-delay:400ms]">
          Psikoloji, teknoloji ve veri bilimi alanlarında derinlemesine analizler,
          <br />
          araştırmalar ve güncel içeriklerle bilgi dünyanızı genişletin.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up [animation-delay:600ms]">
          <Button
            size="lg"
            onClick={() => router.push(primaryButtonUrl)}
            className="group items-center justify-center flex leading-0 px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl"
          >
            {primaryButtonText}
            <ArrowRightIcon className="w-4! h-4! " />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(secondaryButtonUrl)}
            className="px-8 py-6 text-base font-semibold backdrop-blur-sm bg-white/50 dark:bg-black/50 border-neutral-200 dark:border-neutral-800 hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300"
          >
            {secondaryButtonText}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-16 animate-fade-in-up [animation-delay:800ms]">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <span className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">100+</span>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-500">İçerik</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <span className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">500+</span>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-500">Okuyucu</span>
          </div>
          <div className="flex flex-col items-center col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              <span className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">10+</span>
            </div>
            <span className="text-sm text-neutral-500 dark:text-neutral-500">Kategori</span>
          </div>
        </div>
      </div>
    </section>
  );
}
