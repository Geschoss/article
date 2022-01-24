type MyExclude<T, U> = T extends U ? never : T;

type Test1 = MyExclude<'age' | 'name' | 'city', 'age'>;