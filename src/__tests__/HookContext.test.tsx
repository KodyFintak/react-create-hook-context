import { PropsWithChildren } from "react";
import { renderHook, RenderHookResult } from "@testing-library/react";
import { createHookContextFor } from "../HookContext";
import { useContext } from "use-context-selector";

describe("createHookContext", () => {
  it("gets hook value from raw Context", () => {
    const hookResult = renderWithMyHookProvider(() =>
      useContext(MyHookContext),
    );
    expect(hookResult.result.current?.name).toEqual("Kody");
  });

  it("selects value from context", () => {
    const hookResult = renderWithMyHookProvider(() =>
      useMyHookSelector((myHook) => myHook.name),
    );
    expect(hookResult.result.current).toEqual("Kody");
  });

  it("selects deep equal from context", () => {
    const hookResult = renderWithMyHookProvider(() =>
      useMyHookDeepSelector((myHook) => myHook.name),
    );
    expect(hookResult.result.current).toEqual("Kody");
  });
});

function renderWithMyHookProvider<T>(hook: () => T): RenderHookResult<T, any> {
  const wrapper = (props: PropsWithChildren) => (
    <MyHookProvider>{props.children}</MyHookProvider>
  );
  return renderHook(hook, { wrapper });
}

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
