import React, { useState, useEffect } from "react";

interface Props {
    targetDate: string;
    textIfEnded?: string;
    startingText?: string;
}

const CountdownTimer = ({
    targetDate,
    textIfEnded = "Ended",
    startingText,
}: Props) => {
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
            {timeLeft.days < 0 ||
            timeLeft.hours < 0 ||
            timeLeft.minutes < 0 ||
            timeLeft.seconds < 0 ? (
                textIfEnded
            ) : (
                <>
                    {startingText}
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                    {timeLeft.seconds}s
                </>
            )}
        </p>
    );
};

export default CountdownTimer;
