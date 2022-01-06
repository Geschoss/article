const { fileStorage } = require('../shared/storages.js');

const personStorage = fileStorage('./person1.json');

const ageByBirth = (birthStr) => {
    const birth = new Date(birthStr);
    const difference = new Date() - birth;
    return Math.floor(difference / 31536000000);
};

const createPerson = (storage) => {
    return {
        get: () =>
            storage
                .read()
                .then(({ name, birth }) => ({ name, age: ageByBirth(birth) })),

        save: ({ birth, name }) => {
            storage
                .write({
                    birth,
                    name: name.trim(),
                })
                .then((person) => person);
        },
    };
};
const Person = createPerson(personStorage);

module.exports = { Person };
