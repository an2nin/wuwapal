import { useMutation } from '@tanstack/react-query';
import { fetchRevokeTokens } from '@/features/auth/apis/fetch-revoke-tokens';
import { useAuthStore } from '@/shared/stores/auth';

export function useAuthLogout() {
  const clearStore = useAuthStore(state => state.clearStore);

  return useMutation({
    mutationFn: fetchRevokeTokens,
    onSettled: () => {
      clearStore();
    },
  });
}
