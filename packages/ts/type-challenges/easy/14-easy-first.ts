type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type arr3 = [3]
type arr4 = []

type First<T extends ReadonlyArray<any>> = T extends [] ? never : T[0];

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
type head3 = First<arr3> // expected to be 3
type head4 = First<arr4> // expected to be never