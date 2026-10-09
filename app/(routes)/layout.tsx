import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createMeta } from '@/lib/meta';
import MainLayout from '@/shared/components/layout/main-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = createMeta({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout fontClassName={inter.variable} children={children} />
  );
}
