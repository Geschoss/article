// Last firts try
type Tail<A extends Array<any>> = ((...t: A) => any) extends (
    _: any,
    ...rest: infer TT
) => any
    ? TT
    : never;

type Last<A extends Array<any>> = A extends [infer Head] ? Head : Last<Tail<A>>;

type LastR = Last<['a', 'b', 'c']>; // expected to be 'c'
type LastR1 = Last<[3, 2, 1]>; // expected to be 1
type LastR2 = Last<[3]>; // expected to be 3

// Second try

type Last2<A extends Array<any>> = A extends [...any[], infer T] ? T : never;

type Last2R = Last<['a', 'b', 'c']>; // expected to be 'c'
type Last2R1 = Last<[3, 2, 1]>; // expected to be 1
type Last2R2 = Last<[3]>; // expected to be 3
