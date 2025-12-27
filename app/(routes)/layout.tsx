import type { Metadata } from 'next';
import { createMeta } from '@/lib/meta';
import MainLayout from '@/shared/components/layout/main-layout';
import './globals.css';

export const metadata: Metadata = createMeta({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout children={children} />
  );
}
