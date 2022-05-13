declare type Expect<T extends true> = T;
declare type ExpectTrue<T extends true> = T;
declare type ExpectFalse<T extends false> = T;
declare type IsTrue<T extends true> = T;
declare type IsFalse<T extends false> = T;

declare type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
    T
>() => T extends Y ? 1 : 2
    ? true
    : false;
declare type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;

// https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
declare type IsAny<T> = 0 extends 1 & T ? true : false;
declare type NotAny<T> = true extends IsAny<T> ? false : true;

declare type Debug<T> = { [K in keyof T]: T[K] };
declare type MergeInsertions<T> = T extends object
    ? { [K in keyof T]: MergeInsertions<T[K]> }
    : T;

declare type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;

declare type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
    ? true
    : false;
declare type ExpectValidArgs<
    FUNC extends (...args: any[]) => any,
    ARGS extends any[]
> = ARGS extends Parameters<FUNC> ? true : false;

declare type UnionToIntersection<U> = (
    U extends any ? (k: U) => void : never
) extends (k: infer I) => void
    ? I
    : never;
