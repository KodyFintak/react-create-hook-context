type ExcludeNonReferential<T> = Exclude<T, Function>;
export type PrimitiveSelectorResult<T> = Exclude<T, object> & ExcludeNonReferential<T>;
export type EqualitySelectorResult<T> = Extract<T, object> & ExcludeNonReferential<T>;
