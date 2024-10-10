// Includes first try

type Includes<A extends Array<any>, I> = {
  [K in A[number]]: true;
}[I] extends true
  ? true
  : false;

type Includes_2<A extends ReadonlyArray<any>, U> = U extends A[number]
  ? true
  : false;

type isPillarMenR = Includes_2<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
type isPillarMenR1 = Includes_2<
  ['Kars', 'Esidisi', 'Wamuu', 'Santana'],
  'Santana'
>; // expected to be `true`
