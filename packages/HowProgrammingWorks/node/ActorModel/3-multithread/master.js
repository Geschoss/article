'use strict';

const threads = require('worker_threads');
const { Worker } = threads;

const actors = new Map();

class MasterSystem {
    static start(name, count = 1) {
        if (!actors.has(name)) {
            const ready = [];
            const instances = [];
            const queue = [];
            actors.set(name, { ready, instances, queue });
        }
        const { ready, instances } = actors.get(name);
        for (let i = 0; i < count; i++) {
            const actor = new Worker('./system.js');
            console.log({ actor });
            MasterSystem.subscribe(actor);
            ready.push(actor);
            instances.push(actor);
            actor.postMessage({ command: 'start', name });
        }
    }

    static stop(name) {
        const record = actors.get(name);
        if (record) {
            const { instances } = record;
            for (const actor of instances) {
                actor.postMessage({ command: 'stop' });
            }
        }
    }

    static send(name, data) {
        const record = actors.get(name);
        if (record) {
            const { ready, queue } = record;
            const actor = ready.shift();
            if (!actor) {
                queue.push(data);
                return;
            }
            actor.postMessage({ command: 'message', data });
        }
    }

    static subscribe(actor) {
        actor.on('message', (message) => {
            const { command, name } = message;
            if (command === 'message') {
                const { data } = message;
                MasterSystem.send(name, data);
                return;
            }
            if (command === 'start') {
                const { count } = message;
                MasterSystem.start(name, count);
                return;
            }
            if (command === 'stop') {
                MasterSystem.stop(name);
                return;
            }
            if (command === 'ready') {
                const { id } = message;
                const record = actors.get(name);
                if (record) {
                    const { ready, instances, queue } = record;
                    for (const actor of instances) {
                        if (actor.id === id) ready.push(actor);
                    }
                    if (queue.length > 0) {
                        const next = queue.shift();
                        MasterSystem.send(name, next);
                    }
                }
            }
        });
    }
}

module.exports = MasterSystem;