import {useState} from 'react';

interface IuseCounterProps {
  counter: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

export function useCounter(initialValue = 0): IuseCounterProps {
  const [counter, setCounter] = useState<number>(initialValue);

  const increase = (): void => {
    setCounter(counter + 1);
  };
  const decrease = (): void => {
    setCounter(counter - 1);
  };
  const reset = (): void => {
    setCounter(initialValue);
  };

  return {
    counter,
    increase,
    decrease,
    reset,
  };
}
