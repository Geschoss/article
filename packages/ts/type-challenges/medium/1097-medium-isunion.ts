/*
  1097 - IsUnion
  -------
  by null (@bencor) #medium 
  
  ### Question
  
  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.
  
  For example:
    
    ```ts
    type case1 = IsUnion<string>  // false
    type case2 = IsUnion<string|number>  // true
    type case3 = IsUnion<[string|number]>  // false
    ```
  
  > View on GitHub: https://tsch.js.org/1097
*/

/* _____________ Your Code Here _____________ */

type IsUnion<T, B = T> = T extends T ? ([B] extends [T] ? false : true) : false;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<IsUnion<string>, false>>,
    Expect<Equal<IsUnion<string | number>, true>>,
    Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
    Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
    Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
    Expect<Equal<IsUnion<{ a: string | number }>, false>>,
    Expect<Equal<IsUnion<[string | number]>, false>>,
    // Cases where T resolves to a non-union type.
    Expect<Equal<IsUnion<string | never>, false>>,
    Expect<Equal<IsUnion<string | unknown>, false>>,
    Expect<Equal<IsUnion<string | any>, false>>,
    Expect<Equal<IsUnion<string | 'a'>, false>>
];
