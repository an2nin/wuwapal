import { api } from '@/lib/api/client';
import { GLOBAL_STAT_GIST } from '@/lib/api/endpoints';

export function getPityDistribution() {
  return api.get<any>(GLOBAL_STAT_GIST);
}
