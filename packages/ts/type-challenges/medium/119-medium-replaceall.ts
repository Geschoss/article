/**
 * Implement ReplaceAll<S, From, To> which replace
 * the all the substring From with To in the given string S
 */

type ReplaceAll<
    S extends string,
    From extends string,
    To extends string
> = From extends ''
    ? S
    : S extends `${infer Head}${From}${infer Rest}`
    ? `${Head}${To}${ReplaceAll<Rest, From, To>}`
    : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
    Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
    Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
    Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
    Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
    Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
    Expect<Equal<ReplaceAll<'', '', ''>, ''>>
];
