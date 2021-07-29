import { createEffect, createMemo, createSignal } from './reactive';

const [firtstName, setFirstName] = createSignal('John');
const [lastName, setLastName] = createSignal('Smith');
const [showFullName, setShowFullName] = createSignal(true);

const displayName = createMemo(() => {
    if (!showFullName()) {
        return firtstName();
    }

    return `${firtstName()} ${lastName()}`;
});

createEffect(() => {
    console.log('My name is ', displayName());
});

setShowFullName(false);
setLastName('Legend');
setShowFullName(true);
setFirstName('Pavel');
