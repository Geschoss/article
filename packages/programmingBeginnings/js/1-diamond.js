const readline = require('readline/promises');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const askHeight = async () => {
    let height = 0;
    do {
        height = await reader.question("Enter the diamond''s height (positive odd): ");
    }
    while ((height > 0) && (height % 2 === 0));

    reader.close();

    return height;
}

let diamond = ''
const log = (char) => diamond += char;

askHeight()
    .then((height) => {
        let n = Math.round(height / 2);
        for (let k = 1; k < n + 1; k++) {
            for (let j = 1; j <= n + 1 - k; j++) {
                log(' ');
            }
            log('*');
            if (k > 1) {
                for (let i = 1; i <= 2 * k - 3; i++) {
                    log(' ');
                }
                log('*');
            }

            log('\n');
        }
        for (let k = n - 1; k >= 1; k--) {
            for (let j = 1; j <= n + 1 - k; j++) {
                log(' ');
            }
            log('*');
            if (k > 1) {
                for (let i = 1; i <= 2 * k - 3; i++) {
                    log(' ');
                }
                log('*');
            }

            log('\n');
        }

        console.log(diamond);
    })
