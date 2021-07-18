/**
 * Implement Capitalize<T> which converts the first letter
 * of a string to uppercase and leave the rest as-is.
 */

type Capitalize<S> = S extends `${infer Head}${infer Rest}`
    ? `${Uppercase<Head>}${Rest}`
    : S;

import { Equal, Expect } from '@type-challenges/utils';

type cases = [
    Expect<Equal<Capitalize<'foobar'>, 'Foobar'>>,
    Expect<Equal<Capitalize<'FOOBAR'>, 'FOOBAR'>>,
    Expect<Equal<Capitalize<'foo bar'>, 'Foo bar'>>,
    Expect<Equal<Capitalize<''>, ''>>
];
