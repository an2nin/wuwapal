import { api } from '@/core/api/client';
import { GLOBAL_STAT_GIST } from '@/core/api/endpoints';

export function getPityDistribution() {
  return api.get<any>(GLOBAL_STAT_GIST);
}
