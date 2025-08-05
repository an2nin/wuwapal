import { ArrowRightToLine } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useGetPulls } from '@/features/import-pulls/apis/get-pulls';
import ImportDialog from '@/features/import-pulls/components/import-dialog';
import { isConveneHistoryUrlValid, parseUrlParams } from '@/features/import-pulls/utils/helpers';
import { Button } from '@/shared/components/ui/button';
import { useAccountStore } from '@/shared/stores/account';
import { useLayoutStore } from '@/shared/stores/layout';

interface Props {
  gachaUrl: string;
  gamePath?: string;
}

export default function ImportBtn({ gachaUrl, gamePath }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const accountStore = useAccountStore(state => state);
  const layoutStore = useLayoutStore(state => state);
  const { progress, setProgress, isAllBannerFetched, importBanners, totalBanners } = useGetPulls();

  const handleImport = async () => {
    if (!isConveneHistoryUrlValid(gachaUrl)) {
      toast.error('Please paste a valid Convene Record URL!!');
      return;
    }

    const parsedBody = parseUrlParams(gachaUrl);

    if (accountStore.active && parsedBody.player_id !== accountStore.active) {
      setProgress(200);
      setIsDialogOpen(true);
      return;
    }

    setIsDialogOpen(true);
    await importBanners(parsedBody);

    if (gamePath)
      layoutStore.setGamePath(gamePath);

    accountStore.addAccount({
      displayName: 'Default',
      playerId: parsedBody.player_id,
    });

    accountStore.setActive(parsedBody.player_id);
  };

  return (
    <>
      <ImportDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} progress={progress} totalBanners={totalBanners} isAllBannerFetched={isAllBannerFetched} onReset={() => setProgress(0)} />

      <Button onClick={handleImport} disabled={!gachaUrl}>
        <ArrowRightToLine />
        Import
      </Button>
    </>
  );
}
