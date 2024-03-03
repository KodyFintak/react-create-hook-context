import { createHookContextFor } from "../src/HookContext";

export interface MyHookProps {
  name: string;
}

export function useMyHook(props: MyHookProps = { name: "Kody" }) {
  return {
    name: props.name,
    sayHello: () => `Hello ${props.name}`,
  };
}

export const {
  Context: MyHookContext,
  Provider: MyHookProvider,
  useSelector: useMyHookSelector,
  useSelectorDeepEquals: useMyHookDeepSelector,
} = createHookContextFor(useMyHook);
