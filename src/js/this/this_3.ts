class Task {
    id: string;
    status: string;
    constructor(status, id) {
        this.id = id;
        this.status = status;
    }

    showInfo() {
        console.log(`
            id: ${this.id}
            status: ${this.status}
            this: ${this}
        `)
    }
}

const Done = new Task('Done', 2124);

Done.showInfo()

const showInfo = Done.showInfo;
showInfo()