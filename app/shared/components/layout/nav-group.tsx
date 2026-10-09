import type { NavItem } from '@/shared/constants/navs';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/utils';

interface Props {
  items: NavItem[];
  pathname: string;
}

export default function NavGroup({ items, pathname }: Props) {
  return (
    <ul className="flex bg-navbar border rounded-3xl font-bold">
      {items.filter(item => item.visible).map((item) => {
        const isActive = item.match.includes(pathname);
        const link = (
          <Link
            href={item.path}
            aria-label={item.title}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex gap-3 items-center rounded-3xl py-3 px-5 lg:py-4 lg:px-7 transition-colors',
              isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/20',
            )}
          >
            <item.icon className="size-6 lg:size-8" aria-hidden="true" />
            {isActive && <span>{item.title}</span>}
          </Link>
        );

        return (
          <li key={item.path}>
            {isActive
              ? link
              : (
                  <Tooltip>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      sideOffset={8}
                      className="bg-card text-card-foreground border rounded-full px-4 py-2 text-sm font-bold [&>span]:hidden"
                    >
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                )}
          </li>
        );
      })}
    </ul>
  );
}
