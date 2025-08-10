import type { Account } from '@/shared/stores/account';

export function accountExists(accounts: Account[], displayName: string): boolean {
  return accounts.some(account => account.displayName === displayName);
}

export function playerIdExists(accounts: Account[], playerId: string): boolean {
  return accounts.some(account => account.playerId === playerId);
}
