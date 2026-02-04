import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function ContactPage() {
  const items = [
    {
      value: "content",
      trigger: "Psikodata’da hangi tür içerikler paylaşılıyor?",
      content:
        "Psikodata’da psikoloji, kişisel gelişim, ruh sağlığı, ilişkiler, stres yönetimi ve farkındalık üzerine uzman görüşleri ve bilgilendirici blog yazıları paylaşılmaktadır.",
    },
    {
      value: "writers",
      trigger: "İçerikleri kimler yazıyor?",
      content:
        "İçeriklerimiz alanında eğitim almış psikologlar, psikoloji öğrencileri ve ruh sağlığına ilgi duyan yazarlar tarafından hazırlanmaktadır. Tüm yazılar yayınlanmadan önce editör kontrolünden geçer.",
    },
    {
      value: "free",
      trigger: "Psikodata’yı kullanmak ücretsiz mi?",
      content:
        "Evet, Psikodata üzerindeki tüm blog içeriklerine ücretsiz olarak erişebilirsiniz. Amacımız, psikoloji bilgisini herkes için ulaşılabilir kılmaktır.",
    },
    {
      value: "contact",
      trigger: "Uzmanlara soru sorabilir miyim?",
      content:
        "Şu anda doğrudan birebir danışmanlık hizmeti sunmuyoruz. Ancak içeriklerimiz üzerinden genel psikoloji konularında bilgi edinebilir ve bize iletişim sayfasından sorularınızı iletebilirsiniz.",
    },
    {
      value: "contribute",
      trigger: "Psikodata’da yazı yazabilir miyim?",
      content:
        "Evet, psikoloji alanında içerik üretmek isteyen yazarlar bizimle iletişime geçerek yazı gönderme sürecine dahil olabilirler. Başvurular editör ekibimiz tarafından değerlendirilir.",
    },
  ];

  return (
    <div className='w-full flex justify-between gap-20 mt-10'>
      <div className='flex flex-1 flex-col gap-6'>
        <h2 className='text-3xl font-bold text-card-foreground'>Sıkça Sorulan Sorular</h2>
        <Accordion type="single" collapsible defaultValue="content">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent className='pr-6'>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="flex-1">
        <div>
          <h2 className="text-3xl font-bold text-card-foreground mb-2">Bize Ulaşın</h2>
          <span className='text-balance text-muted-foreground text-sm'>
            Psikodata hakkında sorularınız mı var? Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
          </span>
        </div>

        <div className="grid gap-6 mt-6">
          {/* E-Posta Grubu */}
          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Mail className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-muted-foreground">E-Posta</p>
              <a href="mailto:rabiabetulsahin@gmail.com" className="text-sm font-medium hover:underline">
                rabiabetulsahin@gmail.com
              </a>
            </div>
          </div>

          {/* Telefon Grubu */}
          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Phone className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-muted-foreground">Telefon</p>
              <a href="tel:+901234567890" className="text-sm font-medium hover:underline">
                +90 123 456 7890
              </a>
            </div>
          </div>

          {/* Adres Grubu */}
          <div className="flex items-start gap-4 group">
            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none text-muted-foreground">Adres</p>
              <p className="text-sm font-medium leading-relaxed">
                Psikodata Ofisi, Adana, Türkiye
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ContactPage
