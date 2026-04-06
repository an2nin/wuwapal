import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { createGDriveFile } from '@/features/auth/apis/create-gdrive-file';
import { fetchAuthTokens } from '@/features/auth/apis/fetch-auth-tokens';
import { fetchGDriveFileList } from '@/features/auth/apis/fetch-gdrive-file-list';
import { fetchProfile } from '@/features/auth/apis/fetch-profile';
import { useAuthStore } from '@/shared/stores/auth';

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/drive.appdata',
].join(' ');

export function useGoogleAuthLogin(options?: { onAccessGranted?: () => void }) {
  const authStore = useAuthStore(state => state);
  const onAccessGranted = options?.onAccessGranted;

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
      onAccessGranted?.();
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

  const isPending
    = authTokensMutation.isPending
      || profileMutation.isPending
      || gDriveFileListMutation.isPending
      || createGDriveFileMutation.isPending;

  return { login, isPending };
}
