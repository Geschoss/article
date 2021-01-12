type Tuple10 = ['1', '2', '3']

type TupleToUnion<T extends ReadonlyArray<any>> = T[number];

type Test10 =  TupleToUnion<Tuple10> // expected to be '1' | '2' | '3'i