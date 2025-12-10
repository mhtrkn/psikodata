

import CustomBreadcrumb from '@/components/theme/breadcrumb';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item';
import { formatDate, formatTime } from '@/lib/utils';
import { FacebookIcon, TwitterIcon } from 'lucide-react';

const blogDetailMock = {
  id: 1,
  title: "Zihinsel Sağlığınızı Güçlendirmek: Günlük Pratikler",
  subtitle: "Stres ve anksiyete ile başa çıkmak için etkili yöntemler",
  description: `
    <p>Günlük hayatın stresiyle başa çıkmak çoğu zaman zor olabilir. Bu yazıda meditasyon, mindfulness ve kısa egzersizlerle zihninizi sakinleştirmeyi, kaygıyı azaltmayı ve ruh sağlığınızı güçlendirmeyi öğrenebilirsiniz. Düzenli uyku, sağlıklı beslenme ve hobilerle zihinsel dengeyi koruyun.</p>
    <br>
    <h2>1. Meditasyon ve Mindfulness</h2>
    <p>Günde 10 dakika meditasyon yaparak zihninizi sakinleştirebilir ve anksiyeteyi azaltabilirsiniz.
    <a href="https://www.mindful.org/meditation/" target="_blank" rel="noopener noreferrer">Mindfulness rehberi</a> ile başlayabilirsiniz.</p>
    <br>
    <h2>2. Düzenli Egzersiz</h2>
    <p>Fiziksel aktivite, sadece bedeninizi değil, zihninizi de olumlu yönde etkiler.</p>
    <ul>
      <li>Yürüyüş: Günlük 20 dakikalık yürüyüş stres hormonlarını azaltır.</li>
      <li>Yoga: Hem beden hem de zihin esnekliğini artırır.</li>
      <li>Koşu: Endorfin salgısını artırarak motivasyonu yükseltir.</li>
    </ul>
    <br>
    <h2>3. Uyku Düzeni</h2>
    <p>Yeterli ve düzenli uyku, zihinsel sağlığın temel taşlarından biridir. Uykusuzluk kaygı ve depresyon riskini artırır.</p>
    <br>
    <h2>4. Sağlıklı Beslenme</h2>
    <p>Omega-3, B vitaminleri ve magnezyum içeren besinler beyin fonksiyonlarını destekler ve ruh halini iyileştirir.</p>
    <br>
    <h2>5. Sosyal Bağlar ve Hobiler</h2>
    <p>Dostlarınızla vakit geçirmek, hobilerle ilgilenmek ve yaratıcı aktiviteler zihinsel sağlığınıza büyük katkı sağlar.</p>

    <p>Bu yöntemleri günlük rutininize dahil ederek daha dengeli ve sağlıklı bir zihinsel yaşam sürebilirsiniz.</p>
  `,
  author: {
    name: "Dr. Elif Yılmaz",
    avatar: "/authors/elif.jpg",
    role: "Psikoloji Uzmanı",
    bio: "10 yıldır klinik psikoloji alanında çalışmakta ve danışanlarına stres yönetimi ve kişisel gelişim konularında rehberlik etmektedir.",
  },
  date: "2025-12-06T14:30:00Z", // ISO format
  commentsCount: 12,
  tags: ["Psikoloji", "Stres Yönetimi", "Mindfulness", "Sağlıklı Yaşam"],
  coverImage: "/blog/zihinsel-saglik.jpg",
  relatedPosts: [
    {
      id: 2,
      title: "Kaygı Bozukluğu ile Baş Etme Yöntemleri",
      image: "/blog/kaygi.jpg",
      url: "/blog/kaygi-bozuklugu"
    },
    {
      id: 3,
      title: "Mindfulness Meditasyonu ile Gününüzü Rahatlatın",
      image: "/blog/mindfulness.jpg",
      url: "/blog/mindfulness-meditasyonu"
    },
    {
      id: 4,
      title: "Stres Yönetiminde Egzersizin Rolü",
      image: "/blog/stres-egzersiz.jpg",
      url: "/blog/stres-yonetimi-egzersiz"
    }
  ]
};

function BlogDetailView() {
  return (
    <div className='grid grid-cols-12 w-full place-items-center mt-5 gap-0 lg:gap-4'>
      <div className='hidden lg:flex h-full w-full col-span-2 items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <span className='text-xs font-medium text-card-foreground'>PAYLAŞ</span>
          <Button size={'icon-lg'} variant={'outline'} className='rounded-full'>
            <FacebookIcon />
          </Button>
          <Button size={'icon-lg'} variant={'outline'} className='rounded-full'>
            <TwitterIcon />
          </Button>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-8 mx-auto flex flex-col gap-6 lg:gap-10">
        <div className='block lg:hidden mt-6'>
          <CustomBreadcrumb />
        </div>
        <div className='text-center text-sm lg:text-base text-muted-foreground'>
          {formatDate(blogDetailMock?.date)}, {formatTime(blogDetailMock?.date)}
        </div>

        <div className='flex flex-col justify-center gap-2 text-center'>
          <h1 className="text-3xl lg:text-6xl font-bold">{blogDetailMock.title}</h1>
          <h2 className="text-base lg:text-xl text-muted-foreground mt-2">{blogDetailMock.subtitle}</h2>
        </div>

        <Item className='self-center -mt-4'>
          <ItemMedia>
            <Avatar>
              <AvatarImage src={"https://github.com/evilrabbit.png"} className="grayscale" />
            </Avatar>
          </ItemMedia>
          <ItemContent className="gap-1">
            <ItemTitle>{blogDetailMock?.author?.name}</ItemTitle>
            <ItemDescription>{blogDetailMock?.author?.role}</ItemDescription>
          </ItemContent>
        </Item>

        <div className='hidden lg:block'>
          <CustomBreadcrumb />
        </div>

        <div
          className="prose text-sm lg:text-base max-w-full lg:mt-4 drop-cap leading-[30px] dark:text-neutral-200 text-neutral-800"
          dangerouslySetInnerHTML={{ __html: blogDetailMock.description }}
        />

        <div className="flex items-center justify-center self-center gap-4 my-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <span className='text-xs text-neutral-900 dark:text-neutral-200' key={index}>●</span>
          ))}
        </div>

        <div className='flex items-center gap-2'>
          {blogDetailMock.tags.map((tag, id) => (
            <Badge key={id} className='rounded px-2.5 py-1.5 text-muted-foreground' variant={'secondary'}>{tag}</Badge>
          ))}
        </div>
      </div>
      <div className='hidden lg:block col-span-2' />
    </div>
  )
}

export default BlogDetailView
