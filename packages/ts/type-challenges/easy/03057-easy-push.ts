type Push<T extends ReadonlyArray<any>, U> = [...T, U]


type Result = Push<[1, 2], '3'> // [1, 2, '3']