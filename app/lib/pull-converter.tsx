import { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { useLayoutStore } from '@/shared/stores/layout';
import { useProfileStore } from '@/shared/stores/profile';
import { importV1PullsIntoTable } from '@/shared/utils/importer';

export default function PullConverter() {
  const { hasHydrated, hasPullsConverted } = useLayoutStore(state => state);
  const { profiles } = useProfileStore(state => state);
  const layoutStore = useLayoutStore(state => state);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (hasHydrated && !hasPullsConverted && profiles.default.banners) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsConverting(true);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsDialogOpen(true);

      importV1PullsIntoTable(profiles);
      layoutStore.setHasPullsConverted(true);
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsConverting(false);
    }
  }, [hasHydrated]);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Data migration
            {' '}
            {isConverting ? 'in progress' : 'complete'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            We have made some changes to the pull data format for better experience.
            And currently converting your pull data to the new format.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {isConverting
          ? (<div className="animate-pulse text-lg text-center text-yellow-400">Please Wait ...</div>)
          : (<div className="text-center text-lg text-green-400">Conversion Complete!</div>)}
        <AlertDialogFooter>
          <AlertDialogAction disabled={isConverting}>Close & Reload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
