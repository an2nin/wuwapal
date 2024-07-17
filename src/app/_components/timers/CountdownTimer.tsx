import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now: any = new Date();
            const target: any = new Date(targetDate);
            const timeLeft = target - now;

            return {
                days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
                hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((timeLeft / 1000 / 60) % 60),
                seconds: Math.floor((timeLeft / 1000) % 60),
            };
        };

        const updateTimer = () => {
            setTimeLeft(calculateTimeLeft());
        };

        // Initial calculation
        updateTimer();

        // Update every second
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <p>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
    );
};

export default CountdownTimer;
