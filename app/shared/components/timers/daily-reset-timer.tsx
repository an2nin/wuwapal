// src/DailyResetTimer.js
import React, { useEffect, useState } from 'react';

function DailyResetTimer() {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setIsClient(true);
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setTimeLeft(getTimeUntilReset());
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilReset());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return (
      <div className="flex gap-2 p-3 text-white font-bold w-56 justify-center">
        <h4>Daily Reset In: </h4>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex gap-2 p-3 text-white font-bold w-56 justify-center">
      <h4>Daily Reset In: </h4>
      <p>{formatTimeLeft(timeLeft)}</p>
    </div>
  );
}

function getTimeUntilReset() {
  const now: any = new Date();
  const resetTime: any = new Date(now);

  // Set the time to 4 AM in UTC+8
  resetTime.setUTCHours(20); // 4 AM in UTC+8 is 20 PM UTC
  resetTime.setUTCMinutes(0);
  resetTime.setUTCSeconds(0);
  resetTime.setUTCMilliseconds(0);

  if (now > resetTime) {
    // If the current time is past 4 AM UTC+8, set the reset time to the next day
    resetTime.setUTCDate(resetTime.getUTCDate() + 1);
  }

  return resetTime - now;
}

function formatTimeLeft(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, '0')}h ${minutes
    .toString()
    .padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

export default DailyResetTimer;
