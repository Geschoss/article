function Task(status, id) {

    this.id = id + 100000;

    this.status = `_${status}_`;

    this.showInfo = function() {
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

function TaskInner(status, id) {

    this.id = id + 100000;

    this.status = `_${status}_`;

    this.showInfo = function() {
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