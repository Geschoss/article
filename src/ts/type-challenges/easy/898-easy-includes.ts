// Includes first try

type Includes<A extends Array<any>, I> = {
    [K in A[number]]: true;
}[I] extends true
    ? true
    : false;

type isPillarMenR = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>; // expected to be `false`
type isPillarMenR1 = Includes<
    ['Kars', 'Esidisi', 'Wamuu', 'Santana'],
    'Santana'
>; // expected to be `true`
