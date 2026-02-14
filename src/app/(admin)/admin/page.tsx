"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import clsx from "clsx";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/routes";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { authService } from "@/services/admin-service";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoute = () => {
    router.push(ROUTES.HOME)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !pin) {
      toast.error("Kullanıcı Adı ve Şifre zorunludur!", { description: "Lütfen, tüm alanları eksiksiz biçimde doldurun." });
      return;
    }

    setLoading(true);
    try {
      const success = await authService.login({ username, pin });

      if (success) {
        router.push(ROUTES.ADMIN.DASHBOARD);
      }
    } catch (err) {
      console.error(err);
      toast.error("Sunucu hatası!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='col-span-12 flex flex-row place-items-center'>
      <div className='w-full h-full flex py-10 items-center justify-center'>

        <form onSubmit={handleLogin} className='flex flex-col md:max-w-[404px] w-full items-start gap-[25px]'>
          <div>
            <h2 className='font-semibold text-3xl text-neutral-800 dark:text-neutral-300 mb-1'>Giriş Yap</h2>
            <span className='text-muted-foreground'>Hoş geldiniz 👋  Lütfen bilgilerinizi giriniz.</span>
          </div>

          <div className='flex flex-col w-full gap-5 text-primary'>
            <div className='flex flex-col gap-2.5 w-full'>
              <Label htmlFor="username" className='text-sm font-medium'>Kullanıcı Adı</Label>
              <Input
                id='username'
                type='text'
                placeholder='rabiabetulsahin'
                disabled={loading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={clsx(
                  'w-full py-[15px] px-5 text-sm font-medium h-fit',
                )} />
            </div>

            <div className='flex flex-col gap-2.5 w-full'>
              <Label htmlFor="password" className='text-sm font-medium'>Şifre</Label>
              <Input id='password'
                type='password'
                placeholder="● ● ● ● ● ● ●"
                disabled={loading}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className={clsx(
                  'w-full py-[15px] px-5 text-sm font-medium h-fit')} />
            </div>
          </div>

          <div className='flex flex-col w-full mt-2 gap-2'>
            <Button
              disabled={loading}
              type='submit' className='cursor-pointer leading-5 w-full py-3.5 min-h-12 h-fit text-base font-semibold'>
              {loading ? <Spinner /> : 'Giriş Yap'}
            </Button>
            <Link href={ROUTES.HOME} className="cursor-pointer text-center text-primary leading-5 w-full py-3.5 min-h-12 h-fit text-base font-semibold">
              Anasayfaya Dön
            </Link>
          </div>
        </form>
      </div>

      <div className='hidden md:flex w-full h-screen relative bg-card'>
        <Image
          src='/images/login-splash.jpg'
          fill
          sizes='675/900'
          alt='register-splash'
          className='object-cover'
        />
      </div>
    </div>
  )
}
