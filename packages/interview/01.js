// переменные
function test_1(value) {
  if (true) {
    var value = 2;
    console.log(value);
  }
  console.log(value);
}
test_1('hello');

function test_2(value) {
  if (true) {
    let value = 2;
    console.log(value);
  }
  console.log(value);
}
test_2('hello');

// типы
function test_3(value) {
  value = value + 4;
  return value;
}

const a = 3;
const b = test_3(a);
console.log(a, b);
//----
function test_3(value) {
  return value + ', Pavel!';
}
const str_1 = 'Hello';
const str_2 = test_3(str_1);
console.log(str_1, str_2);
//---
function test_4(value) {
  value.age = 33;
  return value;
}
const obj_1 = { name: 'Pavel' };
const obj_2 = test_4(obj_1);
console.log(obj_1, obj_2);

// Задачи
/*
Повторяет слово n раз
repeatify('hao', 5);
repeatify('tra', 10, '-');
*/
function repeatify(str, times, splitter = ' ') {}
/*
переворачиваем слова
reverseBySeparator(Welcome to this Javascript Guide!);
return string.split(separator).reverse().join(separator);
*/
function reverseBySeparator(string, separator = '') {}

/*
Написать свой map, filter
filter([1, 2, 3, 4, 8], v => v%2 === 0)
filter([1, 2, 3, 4, 8], v => v > 2)
map([1, 2, 3, 4, 8], v => v * 2)
*/
function map(arr, callback) {}
function filter(arr, callback) {}

/*
Развернуть массив в объект
return Object.entries(obj) // [ [ 'name', 'Pavel' ], [ 'age', 33 ] ]
*/
function pairs(obj) {}
pairs({ name: 'Pavel', age: 33 });

/*
Свернуть массив в объект
return arr.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}) 
*/
function toObj(arr) {}
toObj([
  ['name', 'Pavel'],
  ['age', 33],
]);

/*
Карирование
  mul(2)(3); // output : 6
  mul(2)(3)(4); // output : 24
  mul(4)(3)(4); // output : 48
  *
  mul(4)(3)(4)(); // output : 48
*/
function mul(x) {}

/*
Вычислить максимальный и минимальный возраст
 return arr
    .reduce((acc, people) => [...acc, people.age], [])
    .reduce(
      (acc, value) => ({
        min: Math.min(acc.min, value),
        max: Math.max(acc.max, value),
      }),
      {
        min: Number.POSITIVE_INFINITY,
        max: Number.NEGATIVE_INFINITY,
      }
    );
*/
function ages(arr) {}
let peoples = [
  { name: 'Pavel', age: 33 },
  { name: 'Mary', age: 18 },
  { name: 'Bob', age: 42 },
  { name: 'Caren', age: 4 },
];
// const { min, max } = ages(peoples);


/*
Сохранение состояние
*/
function createBase(base) {
 
}

var accumulator = accumulate(6);
accumulator(10); // returns 16
accumulator(10); // returns 26
