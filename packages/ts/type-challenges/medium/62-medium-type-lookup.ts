/**
 * Sometimes, you may want to lookup for a type in a union to by their attributes.
 *
 * In this challenge, we would like to get the corresponding
 * type by searching for the common type field in the union Cat | Dog.
 * In other words, we will expect to get Dog for LookUp<Dog | Cat, 'dog'>
 * and Cat for LookUp<Dog | Cat, 'cat'> in the following example.
 */
interface Cat {
    type: 'cat';
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
    type: 'dog';
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
    color: 'brown' | 'white' | 'black';
}

// LookUp first try
type LookUp1<O, K> = O extends { type: K } ? O : never;

type LookUp1R = LookUp1<Cat | Dog, 'dog'>; // expected to be `Dog`
type LookUp1R1 = LookUp1<Cat | Dog, 'cat'>; // expected to be `Cat`
