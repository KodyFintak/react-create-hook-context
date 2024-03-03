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
  useContext: useMyHookContext,
  useSelector: useMyHookSelector,
  useStrictSelector: useStrictMyHookSelector,
  useSelectorDeepEquals: useMyHookDeepSelector,
  useStrictSelectorDeepEquals: useStrictMyHookDeepSelector,
} = createHookContext(useMyHook);

function MyApp() {
  return (
    <MyHookProvider>
      <Name />
    </MyHookProvider>
  );
}

function Name() {
  const name = useMyHookSelector((x) => x.name);
  return <p>{name}</p>;
}
