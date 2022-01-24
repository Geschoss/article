/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Get an `Object` that is the difference between `O` & `O1`
    
  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Diff<A, B> = Omit<B, keyof A>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type Foo = {
    name: string;
    age: "string";
};

type Bar = {
    name: string;
    age: string;
    gender: number;
};

type cases = [Expect<Equal<Diff<Foo, Bar>, { gender: number }>>];
