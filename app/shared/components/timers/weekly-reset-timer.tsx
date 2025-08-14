// src/WeeklyResetTimer.js
import React, { useEffect, useState } from 'react';

function WeeklyResetTimer() {
  // eslint-disable-next-line react-hooks-extra/prefer-use-state-lazy-initialization
  const [timeLeft, setTimeLeft] = useState(getTimeUntilReset());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilReset());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 p-3 text-white font-bold w-[16.5rem] justify-center">
      <h4>Weekly Reset In: </h4>
      <p>{formatTimeLeft(timeLeft)}</p>
    </div>
  );
}

function getTimeUntilReset() {
  const now: any = new Date();
  const resetTime: any = new Date(now);

  // Set the time to 4 AM in UTC+8 on the next Monday
  resetTime.setUTCHours(20); // 4 AM in UTC+8 is 20 PM UTC
  resetTime.setUTCMinutes(0);
  resetTime.setUTCSeconds(0);
  resetTime.setUTCMilliseconds(0);

  // Set the time to next Sunday 4 AM in UTC+8
  resetTime.setUTCDate(
    resetTime.getUTCDate() + ((7 - resetTime.getUTCDay()) % 7),
  );
  resetTime.setUTCHours(20, 0, 0, 0); // 4 AM in UTC+8 is 20:00 UTC

  if (now > resetTime) {
    // If the current time is past the reset time, set it to next week
    resetTime.setUTCDate(resetTime.getUTCDate() + 7);
  }

  return resetTime - now;
}

function formatTimeLeft(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes
    .toString()
    .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

export default WeeklyResetTimer;
