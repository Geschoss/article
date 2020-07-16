type TaskType = {
    id: number;
    status: string;
    changeStatus: (status: string) => void;
}

// this: TaskType особый синтаксис типизации this
// https://www.typescriptlang.org/docs/handbook/functions.html#this
function Task(this: TaskType, status, id) {
    this.id = id + 100000; // формат нашего id

    this.status = `_${status}_`;

    this.changeStatus = function(status) {
        if (status === '') {
            throw Error('Новый статус пустой');
        }
        console.log(`Статус сменен с ${this.status} на ${status}`)
        this.status = `_${status}_`;
    }

    console.log(`Создали объект со статусом: ${this.status} и id: ${this.id}`)
}

function changeStatusToDone(fn) {
    fn('DONE');
}

const doneTask = new Task('START', 2323);

changeStatusToDone(doneTask.changeStatus)