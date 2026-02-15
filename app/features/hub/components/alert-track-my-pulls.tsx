import { ChartLine } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert';

export default function AlertTrackMyPulls() {
  return (
    <Alert variant="warning">
      <AlertTitle className="flex items-center gap-2 font-bold text-lg">
        <ChartLine className="size-5" />
        New site: TrackMyPulls.com
        <ChartLine className="size-5" />
      </AlertTitle>
      <AlertDescription>
        <p>
          I launched
          {' '}
          <a
            className="underline text-primary hover:text-primary/70 font-bold"
            href="https://trackmypulls.com"
            target="_blank"
            rel="noopener"
          >
            TrackMyPulls.com
          </a>
          {' '}
          for tracking pulls across WuWa and other games.
        </p>
        <p>
          It currently supports
          {' '}
          <strong>Endfield</strong>
          , with more game support coming next.
        </p>
      </AlertDescription>
    </Alert>
  );
}
