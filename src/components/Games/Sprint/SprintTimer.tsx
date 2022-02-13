import React, { useState, useEffect } from 'react';

type TimerData = {
  isActive: boolean;
  onCountdownFinish: () => void;
  initialTime: number;
};
const Timer: React.FC<TimerData> = ({
  isActive,
  onCountdownFinish,
  initialTime,
}) => {
  const [value, setValue] = useState(initialTime);

  useEffect(() => {
    const timerID = setTimeout(() => {
      if (value > 0 && isActive) {
        setValue(value - 1);
      }
    }, 1000);
    return () => clearTimeout(timerID);
  }, [value, isActive]);

  useEffect(() => {
    if (value <= 0) {
      onCountdownFinish();
    }
  }, [onCountdownFinish, value]);
  
  return <>{value}</>;
};

export default Timer;
