function ready() {
    let button = document.getElementById('button');
    button.addEventListener('click', () => {
        let script = document.createElement('script');
        script.src = 'module_1.js';
        script.type = 'text/javascript';

        document.head.appendChild(script);
    });
}

const modules = [
    {
        name: 'module_1',
        loaded: false,
    },
    {
        name: 'module_2',
        loaded: false,
    },
];

const createApp = () => {
    return {
        log: (word) => {
            console.log(word);
        },
    };
};

app = createApp();
