class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  subscribe(event, cb) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    const listeners = this.events.get(event);
    listeners.push(cb);

    return {
      unsubscribe: () => {
        const index = listeners.indexOf(cb);
        if (index !== -1) {
          listeners.splice(index, 1);
        }
      },
    };
  }

  emit(event, args = []) {
    if (!this.events.has(event)) {
      return [];
    }

    const listeners = this.events.get(event);
    return listeners.map((cb) => cb(...args));
  }
}

const emitter = new EventEmitter();

// Subscribe to the onClick event with onClickCallback
function onClickCallback() {
  return 99;
}
const sub = emitter.subscribe('onClick', onClickCallback);

emitter.emit('onClick'); //= // [99]
emitter.emit('onClick'); //= // [99]
sub.unsubscribe(); //= // undefined
emitter.emit('onClick'); //= // []

function cb1(...args) {
  return args.join(',');
}

const sub_2 = emitter.subscribe('firstEvent', cb1);
// const sub_3 = emitter.subscribe('firstEvent', cb1);
emitter.emit('firstEvent', [1, 2, 3]); //= // [99]
sub_2.unsubscribe();
emitter.emit('firstEvent', [4, 5, 6]); //= // [99]
