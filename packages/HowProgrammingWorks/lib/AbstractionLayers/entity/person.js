const { fileStorage } = require('../shared/storages.js');

const personStorage = fileStorage('./person.json');

const calculateAgeByBirth = (birthStr) => {
    const birth = new Date(birthStr);
    const difference = new Date() - birth;
    return Math.floor(difference / 31536000000);
};

const getPerson = ({ res, req, cacher }) => {
    const url = req.url;
    if (cacher.has(url)) {
        const sobj = cacher.get(url);

        res.writeHead(200);
        res.end(sobj);
        return;
    }

    // Some business logic
    personStorage.read(({ name, birth }) => {
        const person = {
            name,
            age: calculateAgeByBirth(birth),
        };

        const personStr = JSON.stringify(person);
        cacher.set(req.url, personStr);

        // HTTP reply
        res.writeHead(200);
        res.end(personStr);
    });
};

const postPerson = ({ res, req, cacher, logger }) => {
    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        let data = Buffer.concat(body).toString();
        const obj = JSON.parse(data);

        if (obj.name) {
            obj.name = obj.name.trim();
        }
        data = JSON.stringify(obj);

        cacher.set(req.url, data);
        personStorage.write(data, () => {
            res.writeHead(200);
            res.end('File saved');
        });
    });
};

module.exports = { getPerson, postPerson };
