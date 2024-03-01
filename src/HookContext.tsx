import React, { PropsWithChildren } from "react";
import {
  Context,
  createContext,
  useContextSelector,
} from "use-context-selector";
import { isEqual as lodashEqual } from "lodash";
import { useEqualContextSelector } from "./useEqualContextSelector";

export interface HookContext<T, P> {
  Context: Context<T | undefined>;
  Provider: (props: PropsWithChildren<{ hookParams?: P }>) => JSX.Element;
  useSelector: <R>(selector: (contextValue: T) => R) => R;
  useSelectorDeepEquals: <R>(selector: (contextValue: T) => R) => R;
}

type HookFunction<T> = () => T;
type HookFunctionWithParam<T, P> = (param: P) => T;

export function createHookContextFor<T, P>(
  hook: HookFunction<T> | HookFunctionWithParam<T, P>,
  isEqual: <R>(a: R | null, b: R) => boolean = lodashEqual,
): HookContext<T, P> {
  const Context = createContext<T | undefined>(undefined);

  function useSelector<R>(selector: (contextValue: T) => R): R {
    return useContextSelector(Context, (contextValue: T | undefined) => {
      if (contextValue === undefined) {
        throw new Error(
          "selector must be used inside of a Provider, otherwise it will not function correctly",
        );
      }
      return selector(contextValue);
    });
  }

  function useSelectorDeepEquals<R>(selector: (contextValue: T) => R): R {
    return useEqualContextSelector(
      Context,
      (contextValue: T | undefined) => {
        if (contextValue === undefined) {
          throw new Error(
            "selector must be used inside of a Provider, otherwise it will not function correctly",
          );
        }
        return selector(contextValue);
      },
      isEqual,
    );
  }

  function Provider(props: PropsWithChildren<{ hookParams?: P }>) {
    const value = props.hookParams
      ? hook(props.hookParams)
      : (hook as HookFunction<T>)();
    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  return {
    Context,
    Provider,
    useSelector,
    useSelectorDeepEquals,
  };
}
