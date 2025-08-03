import Link from 'next/link';
import { env } from '@/core/env';
import { SOCIAL_LINKS } from '@/shared/constants/social-links';

export default function Footer() {
  return (
    <footer className="relative bg-card py-5 rounded-t-2xl lg:rounded-3xl px-7 mb-0 lg:mb-2 border text-xs font-bold text-muted-foreground">
      <div className="flex flex-col lg:flex-row gap-5 justify-center lg:justify-between items-center">
        <div>
          <div>
            {env.NEXT_PUBLIC_APP_NAME}
            .
            <span className="text-primary">
              {env.NEXT_PUBLIC_APP_DOMAIN}
            </span>
            {' '}
            is a Fan-made website.
          </div>
          <div>Game content is property of Kuro Games.</div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex gap-3 items-center justify-end">
            {SOCIAL_LINKS.map((link, idx) => (
              <a
                key={idx}
                className="text-muted-foreground/60 dark:text-muted-foreground/30 dark:hover:text-muted-foreground hover:text-muted-foreground transition-all"
                target="_blank"
                href={link.path}
              >
                {link.icon}
                <span className="sr-only">{link.srOnly}</span>
              </a>
            ))}
          </div>
          <div className="flex gap-1 items-center justify-center lg:justify-end text-primary text-xs">
            <Link
              className="transition-all hover:underline"
              href="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
