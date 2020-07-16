const taskDone = {
    id: 123,
    status: 'Done',
    showInfo: function() {
        console.log(`
            id: ${this.id}
            status: ${this.status}
            this: ${this}
        `)
    },
}

const taskStop = {
    id: 245,
    status: 'Stop',
    showInfo: () => {
        console.log(`
            id: ${this.id}
            status: ${this.status}
            this: ${this}
        `)
    },
}

