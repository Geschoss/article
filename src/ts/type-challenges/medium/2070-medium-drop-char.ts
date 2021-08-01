/*
  2070 - Drop Char
  -------
  by CaptainOfPhB (@CaptainOfPhB) #medium #template-literal #infer
  
  ### Question
  
  Drop a specified char from a string.
  
  For example:
  
  ```ts
  type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
  ```
  
  > View on GitHub: https://tsch.js.org/2070
*/

/* _____________ Your Code Here _____________ */

type DropChar<
    S extends string,
    C extends string
> = S extends `${infer Head}${C}${infer Rest}`
    ? `${Head}${DropChar<Rest, C>}`
    : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    // @ts-expect-error
    Expect<Equal<DropChar<'butter fly!', ''>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<'butter fly!', '!'>, 'butter fly'>>,
    Expect<Equal<DropChar<'    butter fly!        ', ' '>, 'butterfly!'>>,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', ' '>, 'butterfly!'>>,
    Expect<
        Equal<DropChar<' b u t t e r f l y ! ', 'b'>, '  u t t e r f l y ! '>
    >,
    Expect<Equal<DropChar<' b u t t e r f l y ! ', 't'>, ' b u   e r f l y ! '>>
];
