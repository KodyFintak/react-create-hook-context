import { renderHook } from "@testing-library/react";
import { useEqualContextSelector } from "../useEqualContextSelector";
import {
  Counter,
  CounterContext,
  CounterProvider,
} from "../../examples/CounterContext";
import { PropsWithChildren } from "react";

describe("useEqualContextSelector", () => {
  it("selects value from context", () => {
    const wrapper = (props: PropsWithChildren) => (
      <CounterProvider initialValue={5}>{props.children}</CounterProvider>
    );
    const hookResult = renderHook(
      () => useEqualCounterContext((counter) => counter.value),
      { wrapper },
    );
    expect(hookResult.result.current).toEqual(5);
  });
});

function useEqualCounterContext<T>(selector: (counter: Counter) => T) {
  return useEqualContextSelector(CounterContext, (counter) => {
    if (counter === undefined) {
      throw new Error(
        "selector must be used inside of a Provider, otherwise it will not function correctly",
      );
    }
    return selector(counter);
  });
}
