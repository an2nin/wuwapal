import { Card, CardContent } from "@/app/_components/ui/card";
import MovingBorder from "@/app/_components/ui/moving-border";
import { ArrowRightIcon, ExternalLink, GamepadIcon, RocketIcon, TestTubeIcon } from "lucide-react";

export default function TrackMyPulls() {
  return (
    <Card className="h-full">
      <CardContent className="p-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center h-full">

          {/* Left side - Brand and info */}
          <div className="flex flex-col justify-between h-full">
            {/* Header with gaming icons */}
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                  <GamepadIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg">
                  <RocketIcon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg">
                  <TestTubeIcon className="w-6 h-6 text-blue-400" />
                </div>
              </div>

              {/* Status badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-full px-3 py-1.5">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                <span className="text-amber-400 text-xs font-medium">Work in Progress</span>
              </div>
            </div>

            {/* Brand name */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold w-fit bg-gradient-to-r from-primary  to-white bg-clip-text text-transparent">
                TrackMyPulls
              </h1>
              <h2 className="text-xl font-semibold text-muted-foreground mt-2">
                Universal Gacha Pull Tracker
              </h2>
            </div>

            {/* Main message */}
            <div className="flex flex-col gap-4">

              <a href="https://trackmypulls.com/en" target="_blank">
                <MovingBorder isHoverable>
                  <div className="flex items-center gap-3 px-2 min-w-32 justify-center group duration-3000 group-hover:animate-none">
                    <span className="text-foreground transition-all">
                      <ExternalLink />
                    </span>
                    Visit TrackMyPulls.com
                  </div>
                </MovingBorder>
              </a>
            </div>
          </div>

          {/* Right side - CTA and beta info */}
          <div className="flex flex-col gap-6">
            {/* Beta tester note */}
            <div className="p-6 bg-card/80 rounded-xl border border-slate-700/50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-3 h-3 bg-green-400 animate-pulse rounded-full mt-1"></div>
                <div>
                  <p className="text-slate-300 font-medium mb-2 text-lg">Join Early Testing</p>
                  <p className="text-slate-400 leading-relaxed">
                    We’re building TrackMyPulls, a universal gacha pull tracker made for gacha game addicts like you. It’s still in early access, but you can try it out, break things, and tell us what feels good (or not so good).
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}
