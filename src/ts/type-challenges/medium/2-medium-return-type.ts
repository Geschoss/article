const fn = (v: boolean, b: string) => {
    if (v) return v;
    else return b;
};

type MyReturnType<F> = F extends (...args: any) => infer R ? R : never;

type a = MyReturnType<typeof fn>; // should be "1 | 2"
