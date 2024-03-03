import React, { PropsWithChildren } from "react";
import "@testing-library/jest-dom";
import { render, renderHook, RenderHookResult } from "@testing-library/react";
import { useContext } from "use-context-selector";
import {
  defaultAddress,
  MyHookContext,
  MyHookProvider,
  useMyHookContext,
  useMyHookDeepSelector,
  useMyHookSelector,
  useStrictMyHookDeepSelector,
  useStrictMyHookSelector,
} from "../../examples/MyHookProvider";

describe("createHookContext", () => {
  it("provider renders children", () => {
    const screen = render(
      <MyHookProvider>
        <p>Hello</p>
      </MyHookProvider>,
    );
    screen.getByText("Hello");
  });

  describe("with no hookParam prop", () => {
    it("gets hook value from raw Context", () => {
      const hookResult = renderWithMyHookProvider(() =>
        useContext(MyHookContext),
      );
      expect(hookResult.result.current?.name).toEqual("Kody");
    });

    it("gets hook value", () => {
      const hookResult = renderWithMyHookProvider(useMyHookContext);
      expect(hookResult.result.current.name).toEqual("Kody");
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

    describe("strict selectors", () => {
      it("selects primitive value from context", () => {
        const hookResult = renderWithMyHookProvider(() =>
          useStrictMyHookSelector((myHook) => myHook.name),
        );
        expect(hookResult.result.current).toEqual("Kody");
      });

      it("selects deep equal value from context", () => {
        const hookResult = renderWithMyHookProvider(() =>
          useStrictMyHookDeepSelector((myHook) => myHook.address),
        );
        expect(hookResult.result.current).toEqual(defaultAddress);
      });
    });
  });

  describe("with hookParam passed as prop", () => {
    it("passes name to hook", () => {
      const hookResult = renderWithMyHookProviderWithName(
        () => useMyHookSelector((myHook) => myHook.name),
        "John",
      );
      expect(hookResult.result.current).toEqual("John");
    });

    it("uses hook function", () => {
      const hookResult = renderWithMyHookProviderWithName(
        () => useMyHookSelector((myHook) => myHook.sayHello()),
        "John",
      );
      expect(hookResult.result.current).toEqual("Hello John");
    });
  });
});

function renderWithMyHookProvider<T>(hook: () => T): RenderHookResult<T, any> {
  const wrapper = (props: PropsWithChildren) => (
    <MyHookProvider>{props.children}</MyHookProvider>
  );
  return renderHook(hook, { wrapper });
}

function renderWithMyHookProviderWithName<T>(
  hook: () => T,
  name: string,
): RenderHookResult<T, any> {
  const wrapper = (props: PropsWithChildren) => (
    <MyHookProvider hookParams={{ name }}>{props.children}</MyHookProvider>
  );
  return renderHook(hook, { wrapper });
}
