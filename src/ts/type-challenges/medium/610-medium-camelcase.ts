/*
  610 - CamelCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `for-bar-baz` -> `forBarBaz`
  
  > View on GitHub: https://tsch.js.org/610
*/

/* _____________ Your Code Here _____________ */

type CamelCase<S extends string> = S extends `${infer Head}-${infer Rest}`
    ? Rest extends Capitalize<Rest>
        ? `${Head}-${CamelCase<Rest>}`
        : `${Head}${CamelCase<Capitalize<Rest>>}`
    : S;

type T = CamelCase<'foo'>;
type T1 = CamelCase<'foo-bar'>;
type T2 = CamelCase<'foo-bar-baz'>;
type T3 = CamelCase<'foo-Bar-Baz'>;
type T4 = CamelCase<'foo--bar----baz'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
    Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
    Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
    Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
    Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
    Expect<Equal<CamelCase<'foo----------bar'>, 'foo---------Bar'>>,
    Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
    Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
    Expect<Equal<CamelCase<'-'>, '-'>>,
    Expect<Equal<CamelCase<''>, ''>>,
    Expect<Equal<CamelCase<'😎'>, '😎'>>
];
