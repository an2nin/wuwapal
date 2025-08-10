import AccountManager from '@/features/account-manager';
import Backups from '@/features/backups';

export default function SettingPage() {
  return (
    <div className="flex flex-col lg:gap-6 gap-4">
      <AccountManager />
      <Backups />
    </div>
  );
}
