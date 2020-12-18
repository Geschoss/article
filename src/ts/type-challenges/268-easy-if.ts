type If<C, T, F> = C extends true ? T : F;

type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<string, 'a', 'b'> // expected to be 'b'
