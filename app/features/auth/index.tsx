import LoginButton from '@/features/auth/components/login-btn';
import LogoutButton from '@/features/auth/components/logout-btn';
import { useAuthStore } from '@/shared/stores/auth';

export default function Auth() {
  const authStore = useAuthStore(state => state);

  return (
    <>
      {authStore.access
        ? <LogoutButton />
        : <LoginButton />}
    </>
  );
}
