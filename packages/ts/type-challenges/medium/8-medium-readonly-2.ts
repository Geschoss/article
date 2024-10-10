type TodoReadOnly = {
  title: string;
  description: string;
} & {
  completed: boolean;
  age: number;
};

type MyReadonly2<O, U extends keyof O> = {
  [Keys in Exclude<keyof O, U>]: O[Keys];
} & {
  readonly [K in U]: O[U];
};

type ReadOnlyTodo = MyReadonly2<TodoReadOnly, 'title' | 'description'>;

const todoReadnly: ReadOnlyTodo = {
  title: 'Hey',
  description: 'foobar',
  completed: false,
  age: 2,
};

todoReadnly.title = 'Hello'; // Error: cannot reassign a readonly property
todoReadnly.description = 'barFoo'; // Error: cannot reassign a readonly property
todoReadnly.completed = true; // OK
