import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { GLOBAL_STAT_GIST } from '@/lib/api/endpoints';

export interface PityDistributionEntry {
  r: number; // pity at which the pull landed
  c: number; // number of pulls
  p: string; // share of pulls, as a percentage string
}

export interface GlobalBannerStat {
  total: number;
  avg_s4_pity: number;
  avg_s5_pity: number;
  s4_pity_distribution: PityDistributionEntry[];
  s5_pity_distribution: PityDistributionEntry[];
}

export interface GlobalPullStat {
  total_records: number;
  time: number;
  items: Record<string, GlobalBannerStat | undefined>;
}

export async function getPityDistribution(): Promise<GlobalPullStat> {
  // Raw gists are served as text/plain, so the client hands back a string rather than parsed JSON
  const response = await api.get<GlobalPullStat | string>(GLOBAL_STAT_GIST);
  const data: unknown = typeof response === 'string' ? JSON.parse(response) : response;

  if (!data || typeof data !== 'object' || typeof (data as GlobalPullStat).items !== 'object')
    throw new Error('Unexpected global pull stat format');

  return data as GlobalPullStat;
}

// The snapshot changes rarely, so fetch it once per session and share it across banners
export function usePityDistribution() {
  return useQuery({
    queryKey: ['pity-distribution'],
    queryFn: getPityDistribution,
    staleTime: Infinity,
  });
}

// Turns [{ r, c }] into counts indexed by pity - 1, as calculatePityLuck expects
export function toPityCounts(entries: PityDistributionEntry[] | undefined): number[] {
  if (!entries?.length)
    return [];
  const cap = Math.max(...entries.map(entry => entry.r));
  const counts = Array.from<number>({ length: cap }).fill(0);
  entries.forEach((entry) => {
    if (entry.r >= 1)
      counts[entry.r - 1] += entry.c;
  });
  return counts;
}
