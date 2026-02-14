"use client";

import React, { useState } from 'react'
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
import { Mail, MapPin, Phone, Send, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simüle edilmiş form gönderimi
    setTimeout(() => {
      toast.success('Mesajınız gönderildi!', {
        description: 'En kısa sürede size dönüş yapacağız.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqItems = [
    {
      value: "content",
      trigger: "Psikodata'da hangi tür içerikler paylaşılıyor?",
      content:
        "Psikodata'da psikoloji, kişisel gelişim, ruh sağlığı, ilişkiler, stres yönetimi, farkındalık, motivasyon ve duygusal zeka üzerine uzman görüşleri ve bilimsel temelli blog yazıları paylaşılmaktadır. İçeriklerimiz güncel araştırmalar ışığında hazırlanır.",
    },
    {
      value: "writers",
      trigger: "İçerikleri kimler yazıyor?",
      content:
        "İçeriklerimiz lisans ve lisansüstü düzeyde psikoloji eğitimi almış uzmanlar, klinik psikologlar, psikoloji öğrencileri ve ruh sağlığı alanında deneyimli yazarlar tarafından hazırlanmaktadır. Tüm yazılar yayınlanmadan önce editör kontrolünden geçer ve bilimsel doğruluğu teyit edilir.",
    },
    {
      value: "free",
      trigger: "Psikodata'yı kullanmak ücretsiz mi?",
      content:
        "Evet, Psikodata üzerindeki tüm blog içeriklerine tamamen ücretsiz olarak erişebilirsiniz. Herhangi bir üyelik veya ödeme gerektirmez. Amacımız, kaliteli psikoloji bilgisini herkes için erişilebilir ve anlaşılır kılmaktır.",
    },
    {
      value: "contact",
      trigger: "Uzmanlara soru sorabilir miyim?",
      content:
        "Şu anda platformumuz üzerinden doğrudan birebir danışmanlık hizmeti sunmuyoruz. Ancak genel psikoloji konularında sorularınızı iletişim formumuz üzerinden bize iletebilirsiniz. Acil psikolojik destek için lütfen bir uzmana başvurunuz.",
    },
    {
      value: "contribute",
      trigger: "Psikodata'da yazı yazabilir miyim?",
      content:
        "Evet! Psikoloji alanında içerik üretmek isteyen yazarlar, psikologlar ve öğrenciler bizimle iletişime geçerek yazı gönderme sürecine dahil olabilirler. Başvurular editör ekibimiz tarafından değerlendirilir ve uygun görülen yazarlarla iş birliği yapılır.",
    },
    {
      value: "frequency",
      trigger: "Ne sıklıkla yeni içerik yayınlanıyor?",
      content:
        "Haftada 2-3 adet yeni blog yazısı yayınlamayı hedefliyoruz. Özel konular, güncel araştırmalar veya toplumsal olaylar doğrultusunda ek içerikler de paylaşabiliyoruz. Yeni içeriklerden haberdar olmak için bültenimize abone olabilirsiniz.",
    },
    {
      value: "sources",
      trigger: "İçerikleri kaynak göstererek kullanabilir miyim?",
      content:
        "Blog yazılarımızı eğitim amaçlı veya bilgilendirme maksadıyla kaynak göstererek kullanabilirsiniz. Ticari amaçlarla kullanım için lütfen bizimle iletişime geçin. Kaynak gösterirken yazı başlığı, yazar adı ve Psikodata URL'sini belirtmenizi rica ederiz.",
    },
    {
      value: "newsletter",
      trigger: "Blog yazılarını nasıl takip edebilirim?",
      content:
        "Yeni içeriklerden haberdar olmak için footer bölümünden e-posta bültenimize abone olabilir veya sosyal medya hesaplarımızı takip edebilirsiniz. Böylece yeni yazılar, özel seriler ve güncel psikoloji haberleri hakkında bildirim alırsınız.",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "E-Posta",
      value: "rabiabetulsahin@gmail.com",
      href: "mailto:rabiabetulsahin@gmail.com",
      description: "7/24 mesaj gönderebilirsiniz"
    },
    {
      icon: Phone,
      label: "Telefon",
      value: "+90 123 456 7890",
      href: "tel:+901234567890",
      description: "Hafta içi 09:00 - 18:00"
    },
    {
      icon: MapPin,
      label: "Adres",
      value: "Adana, Türkiye",
      href: "#",
      description: "Ofis ziyaretleri randevulu"
    },
    {
      icon: Clock,
      label: "Çalışma Saatleri",
      value: "Pazartesi - Cuma",
      href: "#",
      description: "09:00 - 18:00"
    }
  ];

  return (
    <div className='w-full max-w-5xl mx-auto px-4'>
      {/* Hero Section */}
      <div className='text-center mt-10 mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-card-foreground mb-4'>
          Bize Ulaşın
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Sorularınız, önerileriniz veya iş birliği talepleriniz için bizimle iletişime geçebilirsiniz.
          Size yardımcı olmaktan mutluluk duyarız.
        </p>
      </div>

      {/* Contact Form + Info Section */}
      <div className='grid lg:grid-cols-3 gap-8 mb-16'>
        {/* Contact Form */}
        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-2xl'>
              Mesaj Gönderin
            </CardTitle>
            <CardDescription>
              Formu doldurarak bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 h-full flex flex-col">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col flex-1 gap-6"
            >
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Adınız Soyadınız *</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Rabia Betül Şahin'
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>E-Posta Adresiniz *</Label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='ornek@email.com'
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='subject'>Konu *</Label>
                <Input
                  id='subject'
                  name='subject'
                  placeholder='Mesajınızın konusu'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 flex flex-col flex-1">
                <Label htmlFor="message">Mesajınız *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Lütfen mesajınızı detaylı bir şekilde yazın...'
                  className="flex-1 resize-none"
                  required
                />
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? (
                  'Gönderiliyor...'
                ) : (
                  <>
                    Mesajı Gönder
                    <Send className='h-4 w-4' />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info Cards */}
        <div className='space-y-4'>
          {contactInfo.map((info, index) => (
            <Card key={index} className='group hover:border-primary/50 transition duration-500'>
              <CardContent className='p-4'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                    <info.icon className='h-5 w-5' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm font-medium text-muted-foreground mb-1'>
                      {info.label}
                    </p>
                    {info.href !== '#' ? (
                      <a
                        href={info.href}
                        className='font-medium hover:text-primary transition-colors'
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className='font-medium'>{info.value}</p>
                    )}
                    <p className='text-xs text-muted-foreground mt-1'>
                      {info.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className='mb-16'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl font-bold text-card-foreground mb-3'>
            Sıkça Sorulan Sorular
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz. Aradığınızı bulamadıysanız
            bize mesaj gönderebilirsiniz.
          </p>
        </div>

        <Card>
          <CardContent className='p-6'>
            <Accordion type="single" collapsible defaultValue="content" className='w-full'>
              {faqItems.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className='text-left hover:text-primary'>
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground'>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className='mb-12 bg-primary/5 border-primary/20'>
        <CardContent className='p-8 text-center'>
          <h3 className='text-2xl font-bold mb-3'>Hala Sorunuz mu Var?</h3>
          <p className='text-muted-foreground mb-6 max-w-2xl mx-auto'>
            SSS bölümünde cevap bulamadıysanız veya özel bir konuda görüşmek istiyorsanız,
            yukarıdaki formu kullanarak bize ulaşabilirsiniz.
          </p>
          <Button size='lg' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Send className='h-4 w-4 mr-2' />
            Hemen Mesaj Gönderin
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactPage
