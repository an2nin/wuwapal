'use client';

import type { BannerTable } from '@/core/db';
import { format } from 'date-fns';
import { useLiveQuery } from 'dexie-react-hooks';
import { FileDown, FileUp } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import db from '@/core/db';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { useAccountStore } from '@/shared/stores/account';
import { importV1PullsIntoTable, importV2PullsIntoTable } from '@/shared/utils/importer';

export default function FileBackup() {
  const accountStore = useAccountStore(state => state);
  const banners = useLiveQuery<BannerTable[]>(() => db.banners.toArray());
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleFileUpload(e: any) {
    const file = e.target.files?.[0]; // Safely access the uploaded file

    if (file) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const result = event.target?.result; // Safely access `event.target`
        if (typeof result === 'string') {
          // Ensure the result is a string
          try {
            const importedData = JSON.parse(result); // Parse JSON data
            if (importedData.version === '2.0') {
              await importV2PullsIntoTable(importedData.banners, importedData.accounts || [], importedData.active || null);
              toast.success('Data imported successfully');
            }
            else {
              await importV1PullsIntoTable(importedData.profiles || {});
              toast.success('Data imported successfully');
            }
          }
          catch (error: any) {
            console.error('Error parsing JSON:', error);
            toast.error(`Invalid JSON data: ${error}`);
          }
        }
        else {
          toast.error('File could not be read as text'); // Handle non-string result
        }
      };

      reader.readAsText(file); // Read file as text
    }
  }

  function handleImportFromFile() {
    fileInputRef.current?.click();
  }

  function handleExportToFile() {
    const content: any = {
      version: '2.0',
      active: accountStore.active,
      date: format(new Date(), 'dd/MM/yyyy hh:mm a'),
      banners,
      accounts: accountStore.accounts,
    };

    const dataStr = JSON.stringify(content, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-wuwapal.com-${format(
      new Date(),
      'dd_MM_yyyy_hh_mm_ss',
    )}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <Card className="bg-background border-none">
      <CardHeader>
        <CardTitle>File Backup</CardTitle>
        <CardDescription>
          Manage your data backups by importing from or exporting to JSON files.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <input
            type="file"
            accept="application/json"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
          />
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="outline"
            onClick={handleImportFromFile}
            icon={<FileDown />}
          >
            Import Data
          </Button>
          <Button
            variant="outline"
            icon={<FileUp />}
            onClick={handleExportToFile}
          >
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
