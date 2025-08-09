import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';
import { fetchAuthTokens } from '@/features/auth/apis/fetch-auth-tokens';
import { fetchProfile } from '@/features/auth/apis/fetch-profile';
import { DropdownMenuItem } from '@/shared/components/ui/dropdown-menu';
import { useAuthStore } from '@/shared/stores/auth';
import { createGDriveFile } from '../apis/create-gdrive-file';
import { fetchGDriveFileList } from '../apis/fetch-gdrive-file-list';

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

export default function LoginButton() {
  const authStore = useAuthStore(state => state);

  const profileMutation = useMutation({
    mutationFn: fetchProfile,
    onSuccess: (res) => {
      authStore.setProfile(res);
    },
    onError: (error) => {
      console.error('Error fetching profile:', error);
    },
  });

  const createGDriveFileMutation = useMutation({
    mutationFn: createGDriveFile,
    onSuccess: (res) => {
      authStore.setCloudFileId(res.id);
    },
    onError: (error) => {
      console.error('Error creating GDrive file:', error);
    },
  });

  const gDriveFileListMutation = useMutation({
    mutationFn: fetchGDriveFileList,
    onSuccess: (data) => {
      if (!data.files || data.files.length === 0) {
        createGDriveFileMutation.mutate();
      }
      else {
        authStore.setCloudFileId(data.files[0].id);
      }
    },
    onError: (error: any) => {
      console.error('Error fetching GDrive file list:', error.cause);
    },
  });

  const authTokensMutation = useMutation({
    mutationFn: fetchAuthTokens,
    onSuccess: (res) => {
      authStore.setTokens(
        res.data.access_token,
        res.data.refresh_token,
      );
      profileMutation.mutate();
      gDriveFileListMutation.mutate();
    },
    onError: (error) => {
      console.error('Error fetching auth tokens:', error);
    },
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      authTokensMutation.mutate({
        code: tokenResponse.code,
        redirect_uri: window.location.origin,
      });
    },
    scope: GOOGLE_SCOPES,
    flow: 'auth-code',
  });

  return (
    <DropdownMenuItem onClick={login}>
      <LogIn />
      <span>Log in</span>
    </DropdownMenuItem>
  );
}
