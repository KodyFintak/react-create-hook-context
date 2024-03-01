import { useRef } from "react";
import { Context, useContextSelector } from "use-context-selector";
import { isEqual as lodashEqual } from "lodash";

export const useEqualContextSelector = <T extends any, R extends any>(
  context: Context<T>,
  selector: (val: T) => R,
  isEqual: (a: R | null, b: R) => boolean = lodashEqual,
): R => {
  const prevValue = useRef<R | null>(null);
  const patchedSelector = (state: T): R => {
    const nextValue = selector(state);
    if (isEqual(prevValue.current, nextValue)) {
      return prevValue.current as R;
    }
    prevValue.current = nextValue;
    return nextValue;
  };

  return useContextSelector(context, patchedSelector);
};
