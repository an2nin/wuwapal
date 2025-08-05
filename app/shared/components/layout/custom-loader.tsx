import { Loader2 } from 'lucide-react';
import React from 'react';

export default function CustomLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-sm flex items-center justify-center">
      <div className="relative">
        {/* Main Spinner */}
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />

          {/* Outer Ring */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />

          {/* Inner Glow */}
          <div className="absolute inset-2 w-12 h-12 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-full blur-sm" />
        </div>

        {/* Pulsing Dots */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>

        {/* Loading Text */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white font-medium mb-1">Loading...</p>
          <p className="text-gray-400 text-sm">Please wait</p>
        </div>

        {/* Outer Glow Effect */}
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-full blur-xl animate-pulse" />
      </div>
    </div>
  );
}
