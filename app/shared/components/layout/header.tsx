'use client';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderMenu from '@/shared/components/layout/header-menu';
import HeaderSheet from '@/shared/components/layout/header-sheet';
import Logo from '@/shared/components/layout/logo';
import NavGroup from '@/shared/components/layout/nav-group';
import { NAVS } from '@/shared/constants/navs';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex flex-col sticky top-0 z-50 lg:container w-full bg-background/90 backdrop-blur-md">
      <nav aria-label="Main" className="py-2 rounded-b-xl justify-between items-center gap-3 px-4 hidden md:flex">
        <Logo />
        <div className="flex gap-3">
          <NavGroup items={NAVS.basic} pathname={pathname} />
          <NavGroup items={NAVS.extra} pathname={pathname} />
        </div>
        <HeaderMenu />
      </nav>
      <nav aria-label="Main" className="flex md:hidden justify-between items-center bg-card border-b p-3 rounded-b-2xl">
        <HeaderSheet currentActiveRoute={pathname} />
        <Logo />
        <Link
          href="/settings"
          aria-label="Settings"
          className="bg-background rounded-2xl p-2 hover:bg-accent transition-colors"
        >
          <Settings className="size-7" aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
