import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Brain, Heart, Users, Target, Lightbulb, BookOpen } from 'lucide-react'

const values = [
  {
    icon: Brain,
    title: "Bilimsel Yaklaşım",
    description: "Tüm içeriklerimiz bilimsel araştırmalara ve güncel psikoloji literatürüne dayanır."
  },
  {
    icon: Heart,
    title: "Erişilebilirlik",
    description: "Psikoloji bilgisini herkes için anlaşılır ve ulaşılabilir kılmayı amaçlıyoruz."
  },
  {
    icon: Users,
    title: "Topluluk",
    description: "Ruh sağlığı farkındalığını artıran bir topluluk oluşturuyoruz."
  },
  {
    icon: Target,
    title: "Güvenilirlik",
    description: "İçeriklerimiz uzman psikologlar tarafından hazırlanır ve editör kontrolünden geçer."
  }
]

const features = [
  {
    icon: BookOpen,
    title: "Kapsamlı İçerikler",
    description: "Psikoloji, kişisel gelişim, ruh sağlığı ve ilişkiler üzerine derinlemesine yazılar"
  },
  {
    icon: Lightbulb,
    title: "Pratik Öneriler",
    description: "Günlük hayatta uygulayabileceğiniz bilimsel temelli öneriler ve teknikler"
  },
  {
    icon: Heart,
    title: "Farkındalık",
    description: "Ruh sağlığı konusunda toplumsal farkındalığı artırmaya yönelik içerikler"
  }
]

function AboutPage() {
  return (
    <div className='w-full max-w-5xl mx-auto'>
      {/* Hero Section */}
      <div className='text-center mb-16 mt-10'>
        <h1 className='text-4xl md:text-5xl font-bold text-card-foreground mb-4'>
          Hakkımızda
        </h1>
        <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
          Psikoloji bilgisini herkes için erişilebilir kılma misyonuyla yola çıkan bir platformuz.
        </p>
      </div>

      {/* Mission Section */}
      <Card className='mb-12'>
        <CardHeader>
          <CardTitle className='text-2xl'>Misyonumuz</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 text-muted-foreground'>
          <p>
            Psikodata, psikoloji ve ruh sağlığı konularında bilimsel temelli, anlaşılır ve güvenilir
            içerikler sunarak toplumda farkındalık yaratmayı amaçlayan bir blog platformudur.
          </p>
          <p>
            Ruh sağlığının fiziksel sağlık kadar önemli olduğuna inanıyor ve bu bilincin toplumda
            yaygınlaşması için çalışıyoruz. İçeriklerimiz, alanında uzman psikologlar ve psikoloji
            mezunları tarafından hazırlanarak okuyucularımıza en doğru bilgileri sunmayı hedefliyoruz.
          </p>
        </CardContent>
      </Card>

      {/* What We Offer */}
      <div className='mb-12'>
        <h2 className='text-3xl font-bold text-card-foreground mb-6'>Neler Sunuyoruz?</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <Card key={index} className='group hover:border-primary/50 transition-colors'>
              <CardHeader>
                <div className='p-3 rounded-full bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                  <feature.icon className='h-6 w-6' />
                </div>
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className='text-base'>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className='my-12' />

      {/* Values */}
      <div className='mb-12'>
        <h2 className='text-3xl font-bold text-card-foreground mb-6 text-center'>Değerlerimiz</h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {values.map((value, index) => (
            <div key={index} className='flex gap-4 p-6 rounded-lg border hover:border-primary/50 transition-colors group'>
              <div className='p-3 rounded-full bg-primary/10 text-primary h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                <value.icon className='h-5 w-5' />
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold text-lg mb-2'>{value.title}</h3>
                <p className='text-muted-foreground text-sm'>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vision */}
      <Card className='mb-12'>
        <CardHeader>
          <CardTitle className='text-2xl'>Vizyonumuz</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4 text-muted-foreground'>
          <p>
            Türkiye'de ruh sağlığı konusunda en güvenilir ve kapsamlı bilgi kaynağı olmayı hedefliyoruz.
            İçeriklerimizle insanların kendilerini ve çevrelerindeki insanları daha iyi anlamalarına,
            zihinsel sağlıklarını korumalarına ve geliştirmelerine katkıda bulunmak istiyoruz.
          </p>
          <p>
            Ruh sağlığı konusundaki stigmaların kırılması, profesyonel yardım almanın
            normalleştirilmesi ve toplumda psikolojik okuryazarlığın artırılması için çalışmaya devam edeceğiz.
          </p>
        </CardContent>
      </Card>

      {/* Team Info */}
      <div className='text-center p-8 rounded-lg bg-muted/50'>
        <h2 className='text-2xl font-bold text-card-foreground mb-4'>Ekibimiz</h2>
        <p className='text-muted-foreground max-w-2xl mx-auto'>
          Psikodata ekibi, lisans ve lisansüstü eğitimlerini psikoloji alanında tamamlamış
          uzmanlar, psikoloji öğrencileri ve ruh sağlığına ilgi duyan yazarlardan oluşmaktadır.
          Her bir içeriğimiz, titiz bir editörlük sürecinden geçerek sizlerle buluşuyor.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
