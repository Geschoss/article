/**
 * Implement Trim<T> which takes an exact string type
 * and returns a new string with the whitespace from both ends removed.
 */

type Spaces = ' ' | '\n' | '\t';

type TrimL<S> = S extends `${infer Head}${infer Rest}`
    ? Head extends Spaces
        ? TrimL<Rest>
        : S
    : never;


type TrimR<S> = S extends `${infer Head}${Spaces}`
    ? TrimR<Head> : S;

type Trim<S> = TrimR<TrimL<S>>;

import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Trim<'str'>, 'str'>>,
    Expect<Equal<Trim<' str'>, 'str'>>,
    Expect<Equal<Trim<'     str'>, 'str'>>,
    Expect<Equal<Trim<'str   '>, 'str'>>,
    Expect<Equal<Trim<'     str     '>, 'str'>>,
    Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>
];
