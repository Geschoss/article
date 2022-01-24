type Running = {
    execute: () => void;
    dependencies: Set<Set<Running>>;
};

const context = [];

function subscribe(running: Running, subscriptions: Set<Running>) {
    subscriptions.add(running);
    running.dependencies.add(subscriptions);
}

export function createSignal<T>(value?: T): [() => T, (v: T) => void] {
    const subscriptions = new Set<Running>();

    const read = () => {
        const running = context[context.length - 1];
        if (running) subscribe(running, subscriptions);
        return value;
    };

    const write = (nextValue: T) => {
        value = nextValue;

        for (const sub of [...subscriptions]) {
            sub.execute();
        }
    };
    return [read, write];
}

function cleanup(running) {
    for (const dep of running.dependencies) {
        dep.delete(running);
    }
    running.dependencies.clear();
}

export function createEffect(fn) {
    const execute = () => {
        cleanup(running);
        context.push(running);
        try {
            fn();
        } finally {
            context.pop();
        }
    };

    const running = {
        execute,
        dependencies: new Set(),
    };

    execute();
}

export function createMemo<T>(fn: () => T) {
    const [s, set] = createSignal<T>();
    createEffect(() => set(fn()));

    return s;
} 