import { useMutation } from '@tanstack/react-query';
import { LogOut } from 'lucide-react';
import { fetchRevokeTokens } from '@/features/auth/apis/fetch-revoke-tokens';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';
import { useAuthStore } from '@/shared/stores/auth';

export default function LogoutButton() {
  const authStore = useAuthStore(state => state);

  const revokeTokensMutation = useMutation({
    mutationFn: fetchRevokeTokens,
    onSettled: () => {
      authStore.clearStore();
    },
  });

  return (
    <DropdownMenuItem onClick={() => revokeTokensMutation.mutate()}>
      <LogOut />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}
