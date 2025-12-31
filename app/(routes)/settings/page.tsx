import AccountManager from '@/features/account-manager';
import AdvancedSettings from '@/features/advanced-settings';
import Backups from '@/features/backups';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';

export default function SettingPage() {
  return (
    <div>
      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <div className="flex flex-col gap-4 lg:gap-6">
            <AccountManager />
            <Backups />
          </div>
        </TabsContent>
        <TabsContent value="advanced">
          <AdvancedSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
