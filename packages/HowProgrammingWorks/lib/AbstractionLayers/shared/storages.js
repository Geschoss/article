const fs = require('fs');

const fileStorage = (fileName) => ({
    read() {
        return new Promise((resolve, reject) => {
            try {
                fs.readFile(fileName, (err, dataJson) => {
                    if (!err) {
                        const data = JSON.parse(dataJson);
                        resolve(data);
                    } else {
                        reject(new Error(`Cant read file ${fileName}!`));
                    }
                });
            } catch (e) {
                reject(new Error(`Cant read parse json from ${fileName}`));
            }
        });
    },
    write(data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, data, (err) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(new Error(`Cant write file ${fileName}!`));
                }
            });
        });
    },
});

module.exports = { fileStorage };
