/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Merge two types into a new type. Keys of the second type overrides keys of the first type.
  
  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type InnerMerg<T> = { [K in keyof T]: T[K] };
type Merge<F, S> = InnerMerg<
    { [K in keyof Omit<F, keyof S>]: F[K] } & { [K in keyof S]: S[K] }
>;

type T = Merge<Foo, Bar>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Foo = {
    a: number;
    b: string;
};
type Bar = {
    b: number;
};

type cases = [
    Expect<
        Equal<
            Merge<Foo, Bar>,
            {
                a: number;
                b: number;
            }
        >
    >
];
