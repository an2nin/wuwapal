'use client';
import type { LucideIcon } from 'lucide-react';
import { ChevronsLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title: string | React.ReactNode;
  icon?: LucideIcon;
  backRoute?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, backRoute, icon: Icon, children }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-3 font-bold lg:mb-6 mb-4">
      <div className="flex items-center gap-3">
        {Icon
          ? <Icon className="text-primary size-12" />
          : backRoute && (
            <button
              type="button"
              className="cursor-pointer hover:scale-110 hover:opacity-70 transform transition-transform"
              onClick={() => backRoute ? router.push(backRoute) : router.back()}
            >
              <ChevronsLeft className="text-primary size-12" />
            </button>
          )}
        {typeof title === 'string'
          ? (
              <h1 className="lg:text-3xl text-2xl bg-gradient-to-r from-primary w-fit to-white bg-clip-text text-transparent">
                {title}
              </h1>
            )
          : (
              title
            )}
      </div>

      {children && children}
    </div>
  );
}
