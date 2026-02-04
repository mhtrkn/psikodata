import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Psikodata",
  description:
    "Psikodata ile iletişime geçin. Görüş, öneri ve sorularınız için bize ulaşabilirsiniz.",
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
