import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';

function Navbar() {
  return (
    <nav className="w-full border-b bg-card text-card-foreground">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-4xl font-bold text-primary">psikodata</Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:opacity-70">Hakkında</Link>
          <Link href="/contact" className="hover:opacity-70">İletişim</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar
