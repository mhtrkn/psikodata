import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FacebookIcon, LucideLinkedin, LucideTwitter, PhoneCallIcon } from "lucide-react"

const companyLinks = [
  { title: "Hakkımızda", href: "#" },
  { title: "KVKK", href: "#" },
  { title: "Gizlilik Politikası", href: "#" },
  { title: "Kullanım Şartları", href: "#" },
];

const helpLinks = [
  { title: "Sıkça Sorulan Sorular", href: "#" },
  { title: "Destek", href: "#" },
  { title: "Kullanım Kılavuzu", href: "#" },
  { title: "Geri Bildirim Gönder", href: "#" },
];

const socialLinks = [
  { value: "facebook", href: "#", icon: <FacebookIcon /> },
  { value: "twitter", href: "#", icon: <LucideTwitter /> },
  { value: "linkedin", href: "#", icon: <LucideLinkedin /> },
  { value: "phone", href: "#", icon: <PhoneCallIcon /> },
];

function Footer() {
  return (
    <footer className="w-full border-t bg-card text-card-foreground border-t-neutral-200 dark:border-t-neutral-700 mt-10">
      <div className="container grid grid-cols-1 xl:grid-cols-12 gap-12 mx-auto py-6 pb-10 border-b border-b-neutral-200 dark:border-b-neutral-700 px-4 xl:px-0">
        <div className="col-span-4">
          <Link href="/" className="block mb-2 text-4xl font-bold text-primary">psikodata.</Link>
          <span className="text-sm font-light">
            Psikoloji dünyasından güncel içerikleri, araştırmaları ve pratik önerileri paylaşan bir blog platformudur.
          </span>
        </div>
        <div className="col-span-2 text-left">
          <ul className="text-lg text-neutral-800 dark:text-neutral-300 space-y-2">
            <li className="font-semibold mb-2">Kurumsal</li>
            {companyLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className="text-sm text-neutral-400 hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 text-left">
          <ul className="text-lg text-neutral-800 dark:text-neutral-300 space-y-2">
            <li className="font-semibold mb-2">Yardım</li>
            {helpLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className="text-sm text-neutral-400 hover:underline">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3 text-right flex flex-col gap-2">
          <Label className="text-lg text-neutral-800 mb-2 dark:text-neutral-300 space-y-2" htmlFor="email">İletişim</Label>
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input type="email" id="email" placeholder="rabiabetulsahin@gmail.com" />
            <Button className="cursor-pointer" type="submit">
              Abone Ol
            </Button>
          </div>
          <ToggleGroup type="single" className="flex items-center gap-2">
            {socialLinks.map((item) => (
              <ToggleGroupItem key={item.value} value={item.value} className="rounded-full!">
                <Link href={item.href}>
                  {item.icon}
                </Link>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      <div className="col-span-full text-center py-4">
        © {new Date().getFullYear()} psikodata. Tüm hakları saklıdır.
      </div>
    </footer>
  )
}

export default Footer
