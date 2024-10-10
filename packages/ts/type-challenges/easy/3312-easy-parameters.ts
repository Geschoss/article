type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never;

/* _____________ Test Cases _____________ */
const foo = (arg1: string, arg2: number): void => {};
const bar = (arg1: boolean, arg2: { a: 'A' }): void => {};
const baz = (): void => {};

type T = MyParameters<typeof bar>;

type T_1 = MyParameters<typeof foo>; // [string, number],
type T_2 = MyParameters<typeof bar>; // [boolean, { a: 'A' }]>>,
type T_3 = MyParameters<typeof baz>; // []>>,
