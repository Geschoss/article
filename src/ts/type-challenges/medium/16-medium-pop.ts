// Pop first try

type Pop<A extends Array<any>> = A extends [...infer R, any] ? R : never;

type PopR = Pop<['a', 'b', 'c', 'd']>; // expected to be ['a', 'b', 'c']
type PopR1 = Pop<[3, 2, 1]>; // expected to be [3, 2]
type PopR2 = Pop<[3, 2]>; // expected to be [3]
type PopR3 = Pop<[3]>; // expected to be []
