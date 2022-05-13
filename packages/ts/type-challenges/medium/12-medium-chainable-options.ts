class ChainableConfig {
    private object;

    constructor() {
        this.object = {};
    }

    option(key, value) {
        this.object[key] = value;

        return this;
    }

    get() {
        return this.object;
    }
}
type Merge<T> = { [K in keyof T]: T[K] };
type Chainable<Result = {}> = {
    option<Key extends string, Value>(
        key: Key,
        value: Value
    ): Chainable<Result & { [key in Key]: Value }>;

    get(): Merge<Result>;
};
const config: Chainable = new ChainableConfig();

const resultChainable = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get();

resultChainable; /* ? */
