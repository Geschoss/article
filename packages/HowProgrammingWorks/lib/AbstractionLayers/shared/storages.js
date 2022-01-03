const fs = require('fs');

const fileStorage = (fileName) => ({
    read(callback) {
        fs.readFile(fileName, (err, dataJson) => {
            if (!err) {
                try {
                    const data = JSON.parse(dataJson);
                    callback(data);
                } catch (e) {
                    throw new Error(
                        `Cant read parse json from ${fileName}`
                    );
                }
            } else {
                throw new Error(
                    `Cant read file ${fileName}!`
                );
            }
        });
    },
    write(data, callback) {
        fs.writeFile(fileName, data, (err) => {
            if (!err) {
                callback();
            } else {
                throw new Error(
                    `Cant write file ${fileName}!`
                );
            }
        });
    },
});

module.exports = { fileStorage };
