type X9 = {
    x: {
        a: number;
        b: string;
    };
    y: string;
};
    
type DeepReadonly<T> = T extends never
    ? T
    : { readonly [K in keyof T]: DeepReadonly<T[K]> };

const todo9: DeepReadonly<X9> = {
    x: {
        a: 1,
        b: 'hi',
    },
    y: 'hey',
};

todo9.y = 'hello';
todo9.x.b = 'hello';
