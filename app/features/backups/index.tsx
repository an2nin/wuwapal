import { Cloud } from 'lucide-react';
import CloudSync from '@/features/backups/components/cloud-sync';
import { Card, CardContent } from '@/shared/components/ui/card';

export default function Backups() {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center gap-2 mb-6">
          <Cloud className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-white">Backups</h2>
        </div>
        <div className="space-y-6">
          <CloudSync />
          {/* <ManualBackup /> */}
        </div>
      </CardContent>
    </Card>
  );
}
