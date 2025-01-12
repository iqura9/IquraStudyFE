import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TimerContainer = styled("div")({
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
});

interface TimerProps {
  startedAt: string; // Start time in ISO format
  duration: number; // Duration in hours
}

export const ParticipationTimer: React.FC<TimerProps> = ({
  startedAt,
  duration,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const endTime = new Date(startedAt).getTime() + duration * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Time's up!");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Initial call to set the timer
    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [startedAt, duration]);

  return <TimerContainer>{timeLeft}</TimerContainer>;
};
