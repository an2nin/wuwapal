'use client';

import { Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createImportScript, isGamePathValid } from '@/features/import-pulls/utils/helpers';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

interface Props {
  text: string;
}

export default function CopyCardSemiAutomatic({ text }: Props) {
  const [processedText, setProcessedText] = useState<string | null>(null);

  const handleCopy = () => {
    if (processedText) {
      navigator.clipboard
        .writeText(processedText)
        .then(() => {
          toast.success(
            'Text Copied to Clipboard, now paste it on Windows PowerShell',
          );
        })
        .catch((err) => {
          console.error('Error copying text: ', err);
          toast.error('Error copying text');
        });
    }
  };

  useEffect(() => {
    if (isGamePathValid(text) && text !== '') {
      const ps = createImportScript(text);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setProcessedText(ps);
    }
    else {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setProcessedText(null);
    }
  }, [text]);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex  items-center gap-5">
          <div>
            <Button
              className="font-bol"
              size="icon"
              onClick={handleCopy}
              disabled={!processedText}
            >
              <Copy />
            </Button>
          </div>
          <div>
            {processedText || 'Please enter a valid path to get the script.'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
