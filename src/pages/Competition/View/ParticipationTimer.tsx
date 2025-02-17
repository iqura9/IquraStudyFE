import React, { Dispatch, memo, useEffect, useState } from "react";
import styled from "styled-components";

import { StyledProgress } from "../ViewCompetitionSidebar/styled";

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

const _ParticipationTimer = ({
  startedAt,
  duration,
  setIsCompetitionFinished,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const startTime = new Date(startedAt).getTime();
    const endTime = startTime + duration * 60 * 60 * 1000;

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
      setProgress(
        Math.floor(((now - startTime) / (endTime - startTime)) * 100),
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startedAt, duration, setIsCompetitionFinished]);

  return (
    <>
      <StyledProgress percent={progress} showInfo={false} />
      <TimerContainer>{timeLeft}</TimerContainer>
    </>
  );
};

export const ParticipationTimer = memo(_ParticipationTimer);
