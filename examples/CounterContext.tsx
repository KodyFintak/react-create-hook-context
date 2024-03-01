import { PropsWithChildren, useMemo, useState } from "react";
import { createContext, useContext } from "use-context-selector";

export interface Counter {
  value: number;
  increment: () => void;
}

export const CounterContext = createContext<Counter | undefined>(undefined);

export const useCounter = (): Counter => {
  const counter = useContext(CounterContext);

  if (!counter) {
    throw new Error("useCounter must be used in a CounterContext to function!");
  }

  return counter;
};

interface CounterProps {
  initialValue: number;
}

export function CounterProvider(props: PropsWithChildren<CounterProps>) {
  const [counterValue, setCounter] = useState(props.initialValue);
  const counter: Counter = useMemo(
    () => ({
      value: counterValue,
      increment: () => setCounter((value) => value++),
    }),
    [counterValue, setCounter],
  );

  return (
    <CounterContext.Provider value={counter}>
      {props.children}
    </CounterContext.Provider>
  );
}
