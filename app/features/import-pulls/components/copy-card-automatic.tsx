import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

const scriptUrl = `https://wuwapal.com/scripts/import.ps1`;
const copyText = `[Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12; Invoke-Expression (New-Object Net.WebClient).DownloadString("${scriptUrl}")`;

export default function CopyCardAutomatic() {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        toast.success(
          'Text Copied to Clipboard, now paste it on Windows PowerShell',
        );
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
        toast.error('Error copying text');
      });
  };
  return (
    <>
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-5">
            <div>
              <Button className="font-bol" size="icon" onClick={handleCopy}>
                <Copy />
              </Button>
            </div>
            <p className="break-all">{copyText}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end gap-1 mr-3">
        You can review the script
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={scriptUrl}
          className="text-primary font-bold underline"
        >
          here
        </a>
      </div>
    </>
  );
}
