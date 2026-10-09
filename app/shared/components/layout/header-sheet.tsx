'use client';
import { LogIn, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthLogout } from '@/features/auth/hooks/use-auth-logout';
import { useGoogleAuthLogin } from '@/features/auth/hooks/use-google-auth-login';
import { env } from '@/lib/env';
import Logo from '@/shared/components/layout/logo';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTitle } from '@/shared/components/ui/sheet';
import { NAVS } from '@/shared/constants/navs';
import { useAuthStore } from '@/shared/stores/auth';
import { cn } from '@/shared/utils';

interface Props {
  currentActiveRoute: string;
}

const sheetNavItemClass
  = 'inline-flex items-center gap-4 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full justify-start h-10';

export default function HeaderSheet({ currentActiveRoute }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const access = useAuthStore(state => state.access);
  const { login, isPending: isLoginPending } = useGoogleAuthLogin({
    onAccessGranted: () => setIsOpen(false),
  });
  const revokeTokensMutation = useAuthLogout();
  const showGoogleAuth = Boolean(env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const navItems = [...NAVS.basic, ...NAVS.extra].filter(item => item.visible);

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="bg-background rounded-2xl p-2 hover:bg-accent transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="size-7" aria-hidden="true" />
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <ScrollArea className="h-full">
            <nav aria-label="Mobile" className="flex flex-col min-h-full gap-4 px-5 py-4">
              <div onClick={() => setIsOpen(false)}>
                <Logo />
              </div>
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = item.match.includes(currentActiveRoute);
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          sheetNavItemClass,
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                        )}
                      >
                        <item.icon className="size-6" aria-hidden="true" />
                        <span className="max-w-[200px] truncate">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {showGoogleAuth && (
                <div className="border-t border-border pt-4">
                  <button
                    type="button"
                    className={cn(sheetNavItemClass, 'text-muted-foreground hover:bg-accent hover:text-foreground')}
                    disabled={access ? revokeTokensMutation.isPending : isLoginPending}
                    onClick={() => access ? revokeTokensMutation.mutate() : login()}
                  >
                    {access
                      ? <LogOut className="size-6" aria-hidden="true" />
                      : <LogIn className="size-6" aria-hidden="true" />}
                    <span>{access ? 'Log out' : 'Log in'}</span>
                  </button>
                </div>
              )}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
