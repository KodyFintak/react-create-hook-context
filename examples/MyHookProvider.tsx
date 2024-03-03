import { createHookContext } from "../src/HookContext";

export interface MyHookProps {
  name: string;
}

export const defaultAddress = { street: "123 Main Street", zip: "76124" };

export function useMyHook(props: MyHookProps = { name: "Kody" }) {
  return {
    name: props.name,
    address: defaultAddress,
    sayHello: () => `Hello ${props.name}`,
  };
}

export const {
  Context: MyHookContext,
  Provider: MyHookProvider,
  useSelector: useMyHookSelector,
  useStrictSelector: useStrictMyHookSelector,
  useSelectorDeepEquals: useMyHookDeepSelector,
  useStrictSelectorDeepEquals: useStrictMyHookDeepSelector,
} = createHookContext(useMyHook);
