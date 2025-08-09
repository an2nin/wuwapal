import { env } from '@/core/env';

export const GOOGLE_OAUTH_ENDPOINT = 'https://www.googleapis.com/oauth2/v3';
export const GOOGLE_DRIVE_ENDPOINT = 'https://content.googleapis.com/drive/v3/files';
export const GOOGLE_DRIVE_UPLOAD_ENDPOINT = 'https://content.googleapis.com/upload/drive/v3/files';
export const WUWA_IMPORT_SCRIPT_URL = 'https://wuwapal.com/import.ps1';
export const API_SERVER_ENDPOINT = env.NEXT_PUBLIC_API_URL;
export const WUWA_GACHA_ENDPOINT
  = env.NEXT_PUBLIC_NODE_ENV === 'dev'
    ? `${env.NEXT_PUBLIC_API_URL}/gacha/record/query`
    : 'https://gmserver-api.aki-game2.net/gacha/record/query';
export const GLOBAL_STAT_GIST
  = 'https://gist.githubusercontent.com/an2nin/3f10d0695f68210dd7dcce856cb557a1/raw/global_pull_stat.json';
