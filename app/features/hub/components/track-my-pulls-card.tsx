import type { LucideIcon } from 'lucide-react';
import { ArrowRight, ArrowUpRight, Check, Download, Gamepad2, Sparkles, Upload } from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { cn } from '@/shared/utils';

const GAMES = [
  { name: 'Wuthering Waves', status: 'live' },
  { name: 'Endfield', status: 'live' },
  { name: 'Zenless Zone Zero', status: 'live' },
  { name: 'More soon', status: 'soon' },
] as const;

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  external: boolean;
}

const STEPS: Step[] = [
  {
    icon: Download,
    title: 'Export your backup',
    description: 'Download a backup file from WuWaPal Settings.',
    href: '/settings',
    external: false,
  },
  {
    icon: Upload,
    title: 'Import on TrackMyPulls',
    description: 'Upload the file and pick up right where you left off.',
    href: 'https://trackmypulls.com/en/wuwa/tracker/import?platform=web_export',
    external: true,
  },
];

const stepClass = 'group/step relative flex items-center gap-3 rounded-xl border bg-background/40 p-3 transition-colors hover:border-primary/60 hover:bg-primary/5';

function StepContent({ step, index }: { step: Step; index: number }) {
  return (
    <>
      <div className="relative shrink-0">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
          <step.icon className="size-5" aria-hidden="true" />
        </div>
        <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground ring-2 ring-card">
          {index + 1}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{step.title}</p>
        <p className="text-xs text-muted-foreground">{step.description}</p>
      </div>
      {step.external
        ? <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover/step:text-primary motion-safe:group-hover/step:-translate-y-0.5 motion-safe:group-hover/step:translate-x-0.5" aria-hidden="true" />
        : <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover/step:text-primary motion-safe:group-hover/step:translate-x-0.5" aria-hidden="true" />}
    </>
  );
}

export default function TrackMyPullsCard() {
  return (
    <Card className="relative isolate h-full flex flex-col justify-between overflow-hidden border-primary/30 transition-shadow hover:shadow-[0_0_40px_-12px_var(--primary)]">
      {/* Decorative background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-16 size-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 size-56 rounded-full bg-quality-4/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
      </div>

      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50 text-primary-foreground shadow-lg shadow-primary/30">
            <Gamepad2 className="size-6" aria-hidden="true" />
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Sister project
          </span>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          Try
          {' '}
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            TrackMyPulls
          </span>
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          Cross-game pull tracking built for WuWa players. Keep your pity history organized and easy to review, across every game you play.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <ul className="flex flex-wrap gap-2" aria-label="Supported games">
          {GAMES.map(game => (
            <li
              key={game.name}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
                game.status === 'live'
                  ? 'border border-primary/30 bg-primary/10 text-foreground'
                  : 'border border-dashed text-muted-foreground',
              )}
            >
              {game.status === 'live'
                ? <Check className="size-3 text-primary" aria-hidden="true" />
                : <Sparkles className="size-3" aria-hidden="true" />}
              {game.name}
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Move your data in 2 steps
          </p>
          <ol className="space-y-2">
            {STEPS.map((step, idx) => (
              <li key={step.title}>
                {step.external
                  ? (
                      <a className={stepClass} href={step.href} target="_blank" rel="noopener">
                        <StepContent step={step} index={idx} />
                      </a>
                    )
                  : (
                      <Link className={stepClass} href={step.href}>
                        <StepContent step={step} index={idx} />
                      </Link>
                    )}
              </li>
            ))}
          </ol>
        </div>

        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
          Your existing WuWaPal backup is the fastest way to continue tracking without starting over.
        </p>
      </CardContent>

      <CardFooter>
        <a
          className="group/cta relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 motion-safe:hover:-translate-y-0.5"
          href="https://trackmypulls.com"
          target="_blank"
          rel="noopener"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-primary-foreground/20 blur-sm transition-[left] duration-700 group-hover/cta:left-[120%] motion-reduce:hidden"
          />
          Open TrackMyPulls.com
          <ArrowUpRight className="size-4 transition-transform motion-safe:group-hover/cta:-translate-y-0.5 motion-safe:group-hover/cta:translate-x-0.5" aria-hidden="true" />
        </a>
      </CardFooter>
    </Card>
  );
}
