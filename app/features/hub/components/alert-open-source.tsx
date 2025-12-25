import { Github } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/components/ui/alert';
import { SOCIAL_LINKS_OBJ } from '@/shared/constants/social-links';

export default function AlertOpenSource() {
  return (
    <Alert variant="warning">
      <AlertTitle className="flex items-center gap-2 font-bold text-lg">
        <Github className="size-5" />
        WuWaPal is now open source!
        <Github className="size-5" />
      </AlertTitle>
      <AlertDescription>
        <p>
          The entire WuWaPal codebase is now public. You can explore how it
          works, track changes, and help shape what comes next.
        </p>
        <p>
          Jump in on
          {' '}
          <a
            className="underline text-primary hover:text-primary/70 font-bold"
            href={SOCIAL_LINKS_OBJ.github.path}
            target="_blank"
          >
            GitHub
          </a>
          {' '}
          to report issues, suggest features, or open a pull request.
        </p>
        <p>
          Thanks for supporting WuWaPal and the community!
        </p>
      </AlertDescription>
    </Alert>
  );
}
