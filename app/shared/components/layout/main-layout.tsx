'use client';
import { GoogleAnalytics } from '@next/third-parties/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import NextTopLoader from 'nextjs-toploader';
import Footer from '@/shared/components/layout/footer';
import Header from '@/shared/components/layout/header';
import { Toaster } from '@/shared/components/ui/sonner';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className="antialiased"
      >
        <GoogleAnalytics gaId="G-7NLQRZE5QL" />
        <NextTopLoader showSpinner={false} />
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen scrollbar-thin flex flex-col justify-start transition-[margin-left] ease-in-out duration-300 container mx-auto">
            <Header />
            <main className="flex-1 px-2 lg:my-10 my-5">
              {children}
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
