import { ChevronDown, Languages, Settings } from 'lucide-react';
import Link from 'next/link';
import AuthDropdownItems from '@/features/auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';

export default function HeaderMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex bg-navbar border rounded-3xl cursor-pointer font-bold hover:opacity-90">
          <div className="relative overflow-visible group flex">
            <div className="flex gap-3 items-center rounded-3xl py-4 px-7 bg-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c4-6 12-6 16 0" />
              </svg>
            </div>
            <div className="flex gap-3 items-center rounded-3xl py-4 pl-2 pr-4 ">
              <ChevronDown className="size-8" />
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <Link href="/settings">
            <DropdownMenuItem>
              <Settings />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled>
              <Languages />
              <span className="text-muted-foreground">Languages (soon)</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <span>English</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <AuthDropdownItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
