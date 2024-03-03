# react-create-hook-context
Easily Create React Context for React Hook

Create a React Context for a React Hook with function call. 

Additional Features include
- selectors: (only rerenders when the selector sees a different value via ===)
- deep selector: (only rerenders when the selector sees a different value via a deep object equal)
- strict selectors: gives some typescript to help guide you to use the regular selector for primitives and the deep equals for objects so you only pay the price of deep equality check if you need it

## Install

### yarn

```shell
yarn add react-create-hook-context
```

### npm

```shell
npm install react-create-hook-context
```

## Usage

Given a hook, create a HookContext, that includes a Provider and multiple ways of getting the result of the Hook

```tsx
import { createHookContext } from 'react-create-hook-context';

export function useMyHook(props: MyHookProps = {name: "Kody"}) {
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
```

And then you can use them in your components

```tsx
import { MyHookProvider, useMyHookSelector } from './MyHookProvider';

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
```
