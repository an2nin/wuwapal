import { Space_Grotesk } from 'next/font/google';
import { env } from '@/lib/env';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const featurePills = [
  'Realtime pity tracking',
  'Global banner stats',
  'Multi-device sync',
];

const quickStats = [
  { label: 'Pulls tracked', value: '12,487' },
  { label: 'Active banners', value: '4' },
  { label: 'Accounts', value: '3' },
];

const bannerBars = [
  { label: 'Resonator', height: 110 },
  { label: 'Weapon', height: 80 },
  { label: 'Beginner', height: 60 },
  { label: 'Standard', height: 95 },
];

export default function OgImage() {
  return (
    <section
      className={`${spaceGrotesk.className} relative h-[675px] w-[1200px] overflow-hidden rounded-[36px] border border-white/10 bg-[#101114] p-12 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]`}
    >
      <div className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,142,182,0.35),_transparent_65%)] blur-2xl" />
      <div className="absolute -right-28 top-[-60px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(94,137,255,0.35),_transparent_65%)] blur-2xl" />
      <div className="absolute bottom-[-140px] left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,214,120,0.2),_transparent_70%)] blur-3xl" />
      <div className="absolute inset-0 opacity-35">
        <div className="h-full w-full bg-pattern-stripped" />
      </div>

      <div className="relative z-10 grid h-full grid-cols-[1.15fr_0.85fr] gap-10">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <img
                alt={`${env.NEXT_PUBLIC_APP_NAME} logo`}
                src="/android-chrome-192x192.png"
                className="h-8 w-8 rounded-full border border-white/20 bg-black/30 p-1"
              />
              <span>
                {env.NEXT_PUBLIC_APP_NAME}
                .
                {env.NEXT_PUBLIC_APP_DOMAIN}
              </span>
            </div>
            <h1 className="mt-8 text-5xl font-semibold leading-[1.05]">
              Track WuWa pulls
              <br />
              with clarity and speed.
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">
              A focused companion for Wuthering Waves players who want instant pity insights,
              banner analytics, and reliable backups.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {featurePills.map(pill => (
                <div
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80"
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-8">
            {quickStats.map(stat => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex h-full flex-col gap-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Pity pulse
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-primary">
                Guaranteed soon
              </div>
            </div>
            <div className="mt-5 text-4xl font-semibold">72 / 80</div>
            <div className="mt-1 text-sm text-muted-foreground">Estimated in 8 pulls.</div>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-[#ff9ab6] via-primary to-[#ffd07a]" />
              </div>
              <div className="text-xs font-semibold text-muted-foreground">90%</div>
            </div>
          </div>

          <div className="flex-1 rounded-3xl border border-white/10 bg-black/40 p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Banner snapshot
              </div>
              <div className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                Rate up
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
              <div className="rounded-2xl border border-white/10 bg-white/5 py-3">
                <div className="text-2xl font-semibold text-white">1.9%</div>
                5-star rate
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 py-3">
                <div className="text-2xl font-semibold text-white">65</div>
                Soft pity
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 py-3">
                <div className="text-2xl font-semibold text-white">80</div>
                Hard pity
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Pull density
              </div>
              <div className="mt-4 flex items-end justify-between gap-4">
                {bannerBars.map(bar => (
                  <div key={bar.label} className="flex flex-1 flex-col items-center gap-3">
                    <div
                      className="w-full rounded-2xl bg-gradient-to-t from-[#ff9ab6] via-primary to-[#ffd07a]"
                      style={{ height: `${bar.height}px` }}
                    />
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {bar.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
