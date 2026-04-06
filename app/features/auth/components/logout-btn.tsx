import { LogOut } from 'lucide-react';
import { useAuthLogout } from '@/features/auth/hooks/use-auth-logout';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';

export default function LogoutButton() {
  const revokeTokensMutation = useAuthLogout();

  return (
    <DropdownMenuItem onClick={() => revokeTokensMutation.mutate()}>
      <LogOut />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
