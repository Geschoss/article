const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;

type TupleToObject<T extends ReadonlyArray<any>> = {
    [K in T[number]]: K;
};

const obj: TupleToObject<typeof tuple> = {
    tesla: 'tesla',
    'model 3': 'model 3',
    'model X': 'model X',
    'model Y': 'model Y',
};
