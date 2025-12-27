'use client';
import type { NavItem } from '@/shared/constants/navs';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { env } from '@/lib/env';
import HeaderMenu from '@/shared/components/layout/header-menu';
import HeaderSheet from '@/shared/components/layout/header-sheet';
import { NAVS } from '@/shared/constants/navs';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="flex flex-col sticky top-0 z-50 lg:container w-full bg-background/90">
      <nav className="py-2 rounded-b-xl justify-between items-center px-4 hidden lg:flex">
        <div className="w-fit">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
              loading="lazy"
              decoding="async"
              className="size-10 group-hover:animate-spin"
              src="/android-chrome-192x192.png"
            />
            <div className="relative font-bold overflow-visible">
              {pathname === '/'
                ? (
                    <h1 className="text-2xl">{env.NEXT_PUBLIC_APP_NAME}</h1>
                  )
                : (
                    <div className="text-2xl">{env.NEXT_PUBLIC_APP_NAME}</div>
                  )}
              <div className="absolute top-6 right-0 text-xs text-primary">
                .
                {env.NEXT_PUBLIC_APP_DOMAIN}
              </div>
            </div>
          </Link>
        </div>
        <div className="flex gap-3">
          <ul className="flex bg-navbar border rounded-3xl font-bold">
            {NAVS.basic.map((item: NavItem, idx: number) => {
              if (!item.visible)
                return null;
              const isActive = item.match.includes(pathname);
              return (
                <li key={idx} className="relative overflow-visible group">
                  <Link
                    href={item.path}
                    className={`flex gap-3 items-center rounded-3xl py-4 px-7  ${isActive
                      ? 'bg-primary'
                      : 'hover:bg-primary/20'
                    }`}
                  >
                    <item.icon className="size-8" />
                    <div
                      className={`${isActive
                        ? 'block'
                        : 'hidden'
                      }`}
                    >
                      {item.title}
                    </div>
                    {!isActive && (
                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-[-3rem] w-fit whitespace-nowrap bg-card border rounded-full px-4 py-2">
                        {item.title}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex bg-navbar border rounded-3xl font-bold">
            {NAVS.extra.map((item: NavItem, idx: number) => {
              if (!item.visible)
                return null;
              const isActive = item.match.includes(pathname);
              return (
                <li key={idx} className="relative overflow-visible group">
                  <Link
                    href={item.path}
                    className={`flex gap-3 items-center rounded-3xl py-4 px-7  ${isActive
                      ? 'bg-primary'
                      : 'hover:bg-primary/20'
                    }`}
                  >
                    <item.icon className="size-8" />
                    <div
                      className={`${isActive
                        ? 'block'
                        : 'hidden'
                      }`}
                    >
                      {item.title}
                    </div>
                    {!isActive && (
                      <div className="hidden group-hover:block absolute left-1/2 -translate-x-1/2 bottom-[-3rem] w-fit whitespace-nowrap bg-card border rounded-full px-4 py-2">
                        {item.title}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <HeaderMenu />
      </nav>
      <nav className="flex lg:hidden justify-between bg-card border-b p-3 rounded-b-2xl">
        <HeaderSheet currentActiveRoute={pathname} />
        <div className="w-fit">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
              loading="lazy"
              decoding="async"
              className="size-10 group-hover:animate-spin"
              src="/android-chrome-192x192.png"
            />
            <div className="relative font-bold overflow-visible">
              {pathname === '/'
                ? (
                    <h1 className="text-2xl">{env.NEXT_PUBLIC_APP_NAME}</h1>
                  )
                : (
                    <div className="text-2xl">{env.NEXT_PUBLIC_APP_NAME}</div>
                  )}
              <div className="absolute top-6 right-0 text-xs text-primary">
                .
                {env.NEXT_PUBLIC_APP_DOMAIN}
              </div>
            </div>
          </Link>
        </div>
        <div>
          <button
            type="button"
            onClick={() => router.push('/settings')}
            className="bg-background rounded-2xl p-2"
          >
            <Settings className="size-8" />
          </button>
        </div>
      </nav>
    </header>
  );
}
