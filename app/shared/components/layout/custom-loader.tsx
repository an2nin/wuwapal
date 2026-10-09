import { Loader2 } from 'lucide-react';
import React from 'react';

export default function CustomLoader() {
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="relative">
        {/* Main Spinner */}
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />

          {/* Outer Ring */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary/60 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />

          {/* Inner Glow */}
          <div className="absolute inset-2 w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-sm" />
        </div>

        {/* Pulsing Dots */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>

        {/* Loading Text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-foreground font-medium mb-1">Loading...</p>
          <p className="text-muted-foreground text-sm">Please wait</p>
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full blur-xl animate-pulse" />
      </div>
    </div>
  );
}
