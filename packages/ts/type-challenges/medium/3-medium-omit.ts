interface TodoOmit {
    title: string;
    description: string;
    completed: boolean;
}

type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

type TodoPreview = MyOmit<TodoOmit, 'description' | 'title'>;

const todoOmit: TodoPreview = {
    completed: false,
};
