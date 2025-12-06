import Link from 'next/link';
import ThemeToggle from '../theme/theme-toggle';
import Search from '../theme/navbar-search';

function Navbar() {
  return (
    <nav className="w-full bg-card text-card-foreground border-b border-b-neutral-200 dark:border-b-neutral-700">
      <div className="container mx-auto flex items-center justify-between py-5">
        <Link href="/" className="text-4xl font-bold text-primary">psikodata.</Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="hover:opacity-70">Blog</Link>
          <Link href="/contact" className="hover:opacity-70">Hakkında</Link>
          <Link href="/contact" className="hover:opacity-70">İletişim</Link>
          <ThemeToggle />
          <Search />
        </div>
      </div>
    </nav>
  );
}

export default Navbar
