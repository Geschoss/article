/*
  612 - KebabCase
  -------
  by Johnson Chu (@johnsoncodehk) #medium #template-literal
  
  ### Question
  
  `FooBarBaz` -> `for-bar-baz`
  
  > View on GitHub: https://tsch.js.org/612
*/

/* _____________ Your Code Here _____________ */

type KebabCase<S extends string> = S extends `${infer Head}${infer Rest}`
    ? Rest extends Uncapitalize<Rest>
        ? `${Uncapitalize<Head>}${KebabCase<Rest>}`
        : `${Uncapitalize<Head>}-${KebabCase<Rest>}`
    : S;

type T = KebabCase<'FooBarBaz'>;
type T2 = KebabCase<'foo-bar'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
    Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
    Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
    Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
    Expect<Equal<KebabCase<'-'>, '-'>>,
    Expect<Equal<KebabCase<''>, ''>>,
    Expect<Equal<KebabCase<'😎'>, '😎'>>
];
