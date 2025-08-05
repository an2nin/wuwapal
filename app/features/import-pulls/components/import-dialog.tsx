import { CircleChevronDown, CircleChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  progress: number;
  isAllBannerFetched: boolean;
  totalBanners: number;
  onReset: () => void;
}

export default function ImportDialog({
  isOpen,
  setIsOpen,
  progress,
  isAllBannerFetched,
  totalBanners,
  onReset,
}: Props) {
  const router = useRouter();

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {progress >= 100
              ? 'Fetching Pull Data Failed :('
              : isAllBannerFetched
                ? 'Fetching Pull Data Completed :)'
                : 'Fetching Pull Data ;)'}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        {progress >= 100
          ? (
              <div className="flex flex-col gap-3 justify-center my-2">
                <div className="text-center text-muted-foreground">
                  <div className="text-red-500 font-bold text-2xl mb-2">
                    ⚠️ Error fetching Convene data! ⚠️
                  </div>
                  {progress === 200
                    ? (
                        <>
                          <div>
                            The URL you provided does not match the
                            {' '}
                            <span className="font-bold">player ID or server ID</span>
                            {' '}
                            with your active profile 😞.
                          </div>
                          <div>
                            Please switch your profile to the correct one or create a
                            new profile. It can be done from
                            {' '}
                            <Link
                              href="/settings"
                              className="text-primary underline-offset-4 hover:underline"
                            >
                              Settings
                            </Link>
                            {' '}
                            page.
                          </div>
                        </>
                      )
                    : (
                        <>
                          <div>
                            Please check your
                            {' '}
                            <span className="font-bold">Convene Record URL</span>
                            .
                          </div>
                          <div>
                            It might have
                            {' '}
                            <span className="font-bold">expired</span>
                            , as
                            it is valid for only
                            {' '}
                            <span className="font-bold">1 hour</span>
                            . ⏳
                            {' '}
                          </div>
                          <div>Kindly generate a new one if needed. 😊</div>
                          <div className="mt-2">
                            If you keep facing issue please contact me at
                            {' '}
                            <a
                              className="underline font-bold"
                              href="https://discord.com/invite/DFKG4nqUD4"
                            >
                              Discord.
                            </a>
                          </div>
                        </>
                      )}

                  <div className="mt-2">
                    If you keep facing any issue please contact me at
                    {' '}
                    <a
                      className="underline font-bold"
                      href="https://discord.com/invite/DFKG4nqUD4"
                    >
                      Discord.
                    </a>
                  </div>
                </div>
              </div>
            )
          : (
              <div className="flex flex-col gap-3 justify-center my-2">
                <Progress value={(progress / totalBanners) * 100} />
                {isAllBannerFetched && (
                  <div className="text-green-500 text-center">
                    All Banners imported successfully
                  </div>
                )}
              </div>
            )}
        <AlertDialogFooter>
          {progress >= 100
            ? (
                <Button
                  onClick={() => {
                    onReset();
                    setIsOpen(false);
                  }}
                  variant="outline"
                >
                  Close
                  {' '}
                  <CircleChevronDown />
                </Button>
              )
            : (
                <Button
                  disabled={!isAllBannerFetched}
                  onClick={() => {
                    onReset();
                    router.push('/convene');
                  }}
                >
                  See what you cooked!
                  {' '}
                  <CircleChevronRight />
                </Button>
              )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
