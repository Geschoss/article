// Concat first try
type Flatten1<A> = A extends [infer T] ? T : never;
type Flatten1R1 = Flatten1<[1]>

type Concat1<A, B> = [Flatten1<A>, Flatten1<B>];

type Concat1Result = Concat1<[1], [2]> // expected to be [1, 2]
type Concat1Result2 = Concat1<[1, 2], [2, 3]> // expected to be [1, 2]


// Concat second try

type Concat2<A extends Array<any>, B extends Array<any>> = [...A, ...B];

type Concat2Result = Concat2<[1], [2]> // expected to be [1, 2]
type Concat2Result2 = Concat2<[1, 2], [2, 3]> // expected to be [1, 2, 3, 4]