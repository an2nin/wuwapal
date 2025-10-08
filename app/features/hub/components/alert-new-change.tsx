import { TriangleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert';

export default function AlertNewChange() {
  return (
    <Alert variant="warning">
      <AlertTitle className="flex items-center gap-2 font-bold text-lg">
        <TriangleAlert className="size-5" />
        Website Completely Overhauled!
        <TriangleAlert className="size-5" />
      </AlertTitle>
      <AlertDescription>
        <p>
          <strong>✨ WuWaPal</strong>
          {' '}
          has gone through a
          {' '}
          <strong>complete codebase overhaul</strong>
          ! While this brings exciting improvements, some things might break during the transition.
        </p>
        <p>
          �
          {' '}
          <strong>Don't panic!</strong>
          {' '}
          Your previous data is safely
          {' '}
          <strong>backed up on your device</strong>
          {' '}
          and won't be lost.
        </p>
        <p>
          🐛 If you encounter any issues or bugs, please
          {' '}
          <strong>contact me on Discord</strong>
          {' '}
          so I can fix them quickly. Your feedback helps make WuWaPal better! �
        </p>
        <p>
          Thank you for your patience during this upgrade! �
        </p>
      </AlertDescription>
    </Alert>
  );
}
