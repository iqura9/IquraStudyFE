import React, { Dispatch, useEffect, useState } from "react";
import styled from "styled-components";

const TimerContainer = styled("div")({
  color: "#000",
  fontSize: "18px",
  fontWeight: "bold",
  textAlign: "center",
});

interface TimerProps {
  startedAt: string;
  duration: number;
  setIsCompetitionFinished: Dispatch<React.SetStateAction<boolean>>;
}

export const ParticipationTimer: React.FC<TimerProps> = ({
  startedAt,
  duration,
  setIsCompetitionFinished,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const endTime = new Date(startedAt).getTime() + duration * 60 * 60 * 1000;

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = endTime - now;

      if (diff <= 0) {
        setTimeLeft("Time's up!");
        setIsCompetitionFinished(true);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startedAt, duration, setIsCompetitionFinished]);

  return <TimerContainer>{timeLeft}</TimerContainer>;
};
