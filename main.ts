const operationsMap = {
    TYPE: (args, state) => {
        const { word, cursorPosition } = state;
        const str = args.join(' ');
        state.word = `${word.slice(0, cursorPosition)}${str}${word.slice(
            cursorPosition
        )}`;
        return state;
    },
    SELECT: ([start, end], state) => {
        const cursorPosition = parseInt(end, 10) + 1;
        state.cursorPosition = cursorPosition;
        state.select = { start: parseInt(start, 10), end: cursorPosition };
        return state;
    },
    COPY: (_, state) => {
        const { word, select } = state;
        const { start, end } = select;
        if (start === end) {
            return state;
        }
        state.clipboard.push(word.slice(start, end));
        return state;
    },
    MOVE_CURSOR: ([offsetStr], state) => {
        state.select = { start: 0, end: 0 };

        const offset = parseInt(offsetStr);
        const { cursorPosition, word } = state;
        const position = cursorPosition + offset;

        if (position < 0 && position > word.length) {
            return state;
        }
        state.cursorPosition = position;

        return state;
    },
    PASTE: ([steps_back = '1'], state) => {
        const { word, cursorPosition, select } = state;
        const index = state.clipboard.length - parseInt(steps_back);
        const pasted = state.clipboard[index];
        const { start, end } = select;
        if (start === end) {
            state.word = `${word.slice(0, cursorPosition)}${pasted}${word.slice(
                cursorPosition
            )}`;
            state.cursorPosition = cursorPosition + pasted.length;
        } else {
            state.word = `${word.slice(0, start)}${pasted}${word.slice(end)}`;
            state.cursorPosition = start + pasted.length;
        }
        return state;
    },
};

function solution(operations) {
    const { word } = operations.map(makeOperation).reduce(
        (state, { type, args }) => {
            const operation = operationsMap[type];
            if (!operation) {
                return state;
            }
            return operation(args, state);
        },
        {
            word: '',
            cursorPosition: 0,
            clipboard: [],
        }
    );
    return word;
}

function makeOperation(operationStr) {
    const [type, ...args] = operationStr.split(' ');
    return {
        type,
        args,
    };
}

solution([
    'TYPE Great Britain is the capital of London',
    'SELECT 0 12',
    'COPY',
    'SELECT 32 37',
    'COPY',
    'PASTE 2',
    'SELECT 0 12',
    'PASTE',
    'MOVE_CURSOR 32',
    'TYPE !',
]); /* ? */ // London is the capital of Great Britain!
solution([
    'TYPE aba',
    'SELECT 0 2',
    'COPY',
    'COPY',
    'MOVE_CURSOR 1',
    'TYPE c',
    'PASTE 2',
]); /* ? */ // abacaba
solution(['TYPE hello', 'SELECT 0 1', 'MOVE_CURSOR -1', 'TYPE world']); /* ? */ // hworldello
