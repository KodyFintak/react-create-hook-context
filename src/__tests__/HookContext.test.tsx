import { PropsWithChildren } from "react";
import { renderHook } from "@testing-library/react";
import { createHookContextFor } from "../HookContext";

describe("createHookContext", () => {
  it("selects value from context", () => {
    const wrapper = (props: PropsWithChildren) => (
      <MyHookProvider>{props.children}</MyHookProvider>
    );
    const hookResult = renderHook(
      () => useMyHookSelector((myHook) => myHook.name),
      { wrapper },
    );
    expect(hookResult.result.current).toEqual("Kody");
  });
});

function useMyHook() {
  return {
    name: "Kody",
    sayHello: () => "Hello Kody",
  };
}

const {
  Context: MyHookContext,
  Provider: MyHookProvider,
  useSelector: useMyHookSelector,
  useSelectorDeepEquals: useMyHookDeepSelector,
} = createHookContextFor(useMyHook);
