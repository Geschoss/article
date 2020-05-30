const a = {
    name: 'pavel',
    age: 30,
};

const b = a;

b.name = 'boris';

console.log(a);
console.log(b);