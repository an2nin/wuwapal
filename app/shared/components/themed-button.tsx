'use client';
import Link from 'next/link';
import MovingBorder from '@/shared/components/moving-border';

interface Props {
  href?: string;
  children?: React.ReactNode;
}

export default function ThemedButton({ children, href }: Props) {
  return (
    <MovingBorder hoverable>
      <Link
        href={href || '/'}
        className="flex items-center gap-2 font-bold"
      >
        {children}
      </Link>
    </MovingBorder>
  );
}
