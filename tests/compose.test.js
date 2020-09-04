import { compose, add, minus, multi } from '../src/std/compose';


test('compose', () => {
    const testFn = compose(
        add(3),
        minus(6),
        multi(2)
    );

    expect(testFn(4)).toEqual(1);
    expect(testFn(2)).toEqual(5);
});

