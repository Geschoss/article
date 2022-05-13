/*
  17 - Currying 1
  -------
  by Anthony Fu (@antfu) #hard #array
  
  ### Question
  
  > TypeScript 4.0 is recommended in this challenge
  
  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument. 
  
  For example:
  
  ```ts
  const add = (a: number, b: number) => a + b
  const three = add(1, 2)
  
  const curriedAdd = Currying(add)
  const five = curriedAdd(2)(3)
  ```
  
  The function passed to `Currying` may have multiple arguments, you need to correctly type it.
  
  In this challenge, the curried function only accept one argument at a time. Once all the argument is assigned, it should return its result.
  
  > View on GitHub: https://tsch.js.org/17
*/

/* _____________ Your Code Here _____________ */

type Curry<FN extends Function> = FN extends (...args: infer Args) => infer R
    ? Args extends []
        ? () => R
        : Args extends [a: infer A]
        ? (a: A) => R
        : (a: Args[0]) => Curry<(...a: Tail<Args>) => R>
    : FN;

declare function Currying<FN extends Function>(fn: FN): Curry<FN>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';
import { Tail } from '../medium/15-medium-last';

const curried03 = Currying(() => true);
const curried02 = Currying((a: string) => true);
const curried01 = Currying((a: string, b: number) => true);
const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
    (
        a: string,
        b: number,
        c: boolean,
        d: boolean,
        e: boolean,
        f: string,
        g: boolean
    ) => true
);

type cases = [
    Expect<
        Equal<
            typeof curried1,
            (a: string) => (b: number) => (c: boolean) => true
        >
    >,
    Expect<
        Equal<
            typeof curried2,
            (
                a: string
            ) => (
                b: number
            ) => (
                c: boolean
            ) => (
                d: boolean
            ) => (e: boolean) => (f: string) => (g: boolean) => true
        >
    >
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
