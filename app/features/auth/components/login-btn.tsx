import { LogIn } from 'lucide-react';
import { useGoogleAuthLogin } from '@/features/auth/hooks/use-google-auth-login';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';

export default function LoginButton() {
  const { login } = useGoogleAuthLogin();

  return (
    <DropdownMenuItem onClick={login}>
      <LogIn />
      <span>Log in</span>
    </DropdownMenuItem>
  );
}
