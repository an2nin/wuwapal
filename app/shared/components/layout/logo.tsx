import Link from 'next/link';
import { env } from '@/lib/env';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group rounded-lg">
      <img
        alt={`${env.NEXT_PUBLIC_APP_NAME} Logo`}
        loading="lazy"
        decoding="async"
        className="size-10 group-hover:animate-spin"
        src="/android-chrome-192x192.png"
      />
      <div className="relative font-bold overflow-visible">
        <div className="text-2xl">{env.NEXT_PUBLIC_APP_NAME}</div>
        <div className="absolute top-6 right-0 text-xs text-primary">
          .
          {env.NEXT_PUBLIC_APP_DOMAIN}
        </div>
      </div>
    </Link>
  );
}
