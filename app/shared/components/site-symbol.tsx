import { env } from '@/lib/env';

export default function SiteSymbol() {
  return (
    <div className="lowercase font-bold">
      {env.NEXT_PUBLIC_APP_NAME}
      <span className="text-primary">
        .
        {env.NEXT_PUBLIC_APP_DOMAIN}
      </span>
    </div>
  );
}
