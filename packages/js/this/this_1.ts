type TaskType = {
    id: number;
    status: string;
    showInfo: () => void;
}

// особый синтаксис для this
// https://www.typescriptlang.org/docs/handbook/functions.html#this
function Task(this: TaskType, status: string, id: number) {

    this.id = id + 100000;

    this.status = `_${status}_`;

    this.showInfo = function(this: TaskType) {
        console.log(`
            id: ${this.id}
            status: ${this.status}
            this: ${this}
        `)
    }
}

const doc = {
    status: `doc_status`,
    onClick: function(fn) {
        console.log('onClick')
        /* что то делаем */
        fn();
        /* что то делаем */
    }
}

function TaskInner(this: TaskType, status: string, id: number) {

    this.id = id + 100000;

    this.status = `_${status}_`;

    this.showInfo = function(this: TaskType) {
        console.log(`
            id: ${this.id}
            status: ${this.status}
            this: ${this}
        `)

        function fnInner() {
            console.log(`
                id: ${this.id}
                status: ${this.status}
                this: ${this}
        `)
        }
        fnInner();
    }
}