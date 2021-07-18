/**
 * Implement Replace<S, From, To> which replace
 * the string From with To once in the given string S
 */

type Replace<
    S extends string,
    From extends string,
    To extends string
> = From extends ''
    ? S
    : S extends `${infer Head}${From}${infer Rest}`
    ? `${Head}${To}${Rest}`
    : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
    Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<Replace<'foobarbar', '', ''>, 'foobarbar'>>,
    Expect<Equal<Replace<'foobarbar', 'foo', ''>, 'barbar'>>,
    Expect<Equal<Replace<'', '', ''>, ''>>
];
