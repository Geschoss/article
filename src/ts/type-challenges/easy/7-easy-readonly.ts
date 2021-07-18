type Todo = {
    title: string;
    description: string;
}


type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};

const todo: ReadOnly<Todo> = {
    title: "Hey",
    description: "foobar",
}

todo.description = "hello";
todo.title = "bar";