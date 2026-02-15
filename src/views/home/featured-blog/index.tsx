"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Blog } from "@/types/blogs";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

function FeaturedBlog({
  badge,
  data,
  title,
  subtitle,
  hasBadge = false,
  hasButton = false,
  url = "",
  buttonTitle = "Keşfet",
  firstSectionVisible = true
}: {
  data: Blog | undefined;
  badge: string;
  title: string;
  subtitle: string;
  hasBadge?: boolean;
  hasButton?: boolean;
  url?: string;
  buttonTitle?: string;
  firstSectionVisible?: boolean
}) {
  const router = useRouter();

  const handleRoute = () => {
    if (url) {
      router.push(url);
    }
  };

  if (!data) return null;

  return (
    <section className="col-span-12 w-full">
      {
        firstSectionVisible && (
          <div className="flex flex-col items-center justify-center gap-3 mb-8">
            {hasBadge && (
              <Badge
                variant="secondary"
                className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-neutral-200/50 dark:border-neutral-800/50"
              >
                {badge}
              </Badge>
            )}
            <h2 className="text-3xl xl:text-4xl font-bold text-center bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white bg-clip-text text-transparent">
              {title}
            </h2>
            <p className="max-w-2xl text-sm xl:text-base text-neutral-500 dark:text-neutral-500 text-center">
              {subtitle}
            </p>
          </div>
        )}

      <Card
        onClick={handleRoute}
        className="group relative overflow-hidden border-none cursor-pointer transition shadow-none bg-transparent duration-500"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative h-64 md:h-full min-h-[400px] rounded-3xl overflow-hidden">
            <Image
              src={data!.thumbnail}
              alt={data.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent md:bg-linear-to-r" />
          </div>

          <div className="flex flex-col justify-between p-8 lg:p-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-xs">
                  {data.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(data.created_at).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-neutral-900 dark:text-white line-clamp-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                {data.title}
              </h3>

              <p className="text-neutral-600 dark:text-neutral-400 mb-6 line-clamp-4 leading-relaxed">
                {data.excerpt}
              </p>
            </div>

            {hasButton && (
              <Button
                onClick={handleRoute}
                size="lg"
                className="group/btn w-fit px-6"
              >
                {buttonTitle}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
}

export default FeaturedBlog;
