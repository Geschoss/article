import { Equal, Expect, NotAny } from '@type-challenges/utils';

type Todo = {
    title: string;
    description: string;
    completed: boolean;
}

type MyPick<O, Keys extends keyof O> = {
    [K in Keys]: O[K]
};

type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}