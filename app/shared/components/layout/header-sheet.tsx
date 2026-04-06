'use client';
import { LogIn, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useAuthLogout } from '@/features/auth/hooks/use-auth-logout';
import { useGoogleAuthLogin } from '@/features/auth/hooks/use-google-auth-login';
import { env } from '@/lib/env';
import { Sheet, SheetContent } from '@/shared/components/ui/sheet';
import { NAVS } from '@/shared/constants/navs';
import { useAuthStore } from '@/shared/stores/auth';

interface Props {
  currentActiveRoute: any;
}

const sheetNavItemClass
  = 'inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2 w-full justify-start h-10';

export default function HeaderSheet({ currentActiveRoute }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const access = useAuthStore(state => state.access);
  const { login, isPending: isLoginPending } = useGoogleAuthLogin({
    onAccessGranted: () => setIsOpen(false),
  });
  const revokeTokensMutation = useAuthLogout();
  const showGoogleAuth = Boolean(env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  return (
    <>
      <button
        type="button"
        className="bg-background rounded-2xl p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="size-8" />
      </button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left">
          <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto overflow-x-clip">
            <div dir="ltr" className="relative overflow-hidden">
              <div
                data-radix-scroll-area-viewport=""
                className="h-full w-full rounded-[inherit]"
              >
                <div>
                  <nav className="h-full w-full">
                    <ul className="flex flex-col min-h-[calc(100svh-48px-36px-16px-32px)] lg:min-h-[calc(100svh-32px-40px-32px)] items-start space-y-1 px-2">
                      <li>
                        <div
                          className="mb-4 flex items-center gap-2 hover:no-underline"
                        >
                          <Link
                            href="/"
                            className="flex items-center gap-3 group"
                          >
                            <img
                              alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
                              loading="lazy"
                              decoding="async"
                              className="size-10 group-hover:animate-spin"
                              src="/android-chrome-192x192.png"
                            />
                            <div className="relative font-bold overflow-visible">
                              <div className="text-2xl">
                                {env.NEXT_PUBLIC_APP_NAME}
                              </div>
                              <div className="absolute top-6 right-0 text-xs text-primary">
                                .
                                {env.NEXT_PUBLIC_APP_DOMAIN}
                              </div>
                            </div>
                          </Link>
                        </div>
                      </li>
                      <div className="flex flex-col gap-1">
                        {[...NAVS.basic, ...NAVS.extra]
                          .filter((item: any) => item.visible)
                          .map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className={`w-full rounded-lg hover:bg-gray-700/80 ${currentActiveRoute === item.path
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 hover:opacity-100'
                              }`}
                            >
                              <Link
                                className={sheetNavItemClass}
                                data-state="closed"
                                href={item.path}
                              >
                                <span className="mr-4">
                                  <item.icon className="size-6" />
                                </span>
                                <p className="max-w-[200px] truncate translate-x-0 opacity-100">
                                  {item.title}
                                </p>
                              </Link>
                            </div>
                          ))}
                      </div>
                      {showGoogleAuth && (
                        <div className="mt-4 w-full border-t border-border pt-4 px-2">
                          {access
                            ? (
                                <button
                                  type="button"
                                  className={`${sheetNavItemClass} rounded-lg hover:bg-gray-700/80 opacity-50 hover:opacity-100`}
                                  disabled={revokeTokensMutation.isPending}
                                  onClick={() => revokeTokensMutation.mutate()}
                                >
                                  <span className="mr-4">
                                    <LogOut className="size-6" />
                                  </span>
                                  <p className="max-w-[200px] truncate translate-x-0 opacity-100">
                                    Log out
                                  </p>
                                </button>
                              )
                            : (
                                <button
                                  type="button"
                                  className={`${sheetNavItemClass} rounded-lg hover:bg-gray-700/80 opacity-50 hover:opacity-100`}
                                  disabled={isLoginPending}
                                  onClick={login}
                                >
                                  <span className="mr-4">
                                    <LogIn className="size-6" />
                                  </span>
                                  <p className="max-w-[200px] truncate translate-x-0 opacity-100">
                                    Log in
                                  </p>
                                </button>
                              )}
                        </div>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
