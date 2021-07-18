import { Equal, Expect } from '@type-challenges/utils';

/**
 * Implement TrimLeft<T> which takes an exact string type
 * and returns a new string with the whitespace beginning removed.
 */

// TrimLeft first try
type TrimLeft<S extends string> = S extends `${infer Head}${infer Rest}`
    ? Head extends ' ' | '\n' | '\t'
        ? TrimLeft<Rest>
        : S
    : never;

type cases = [
    Expect<Equal<TrimLeft<'str'>, 'str'>>,
    Expect<Equal<TrimLeft<' str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
    Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>
];
