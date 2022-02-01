/**
 * It's are magic!
 */
const log = (...args) => console.log(...args);

/**
 * Строки
 * @ПОЧИТАТЬ
 * https://learn.javascript.ru/string
 * 
 * Их можно создавать несколькими вариантами
 */
const singleQuoteStr = 'Строка созданая с помощью одинарной ковычки';
const doubleQuoteStr = "Строка созданая с помощью двойной ковычки";
/**
 * разницы между двойной ковычкой и одинарной нет
 * можно их вкладывать в друг друга
 */
const innerQuote = "Лучший по версии журнала 'Юлия'";
/**
 * сами попробуй те обратный вариант
 */
/**
 * строки можно конкатинировать(складывать)
 */
const str1 = "Hello ";
const str2 = "world";
const result = str1 + str2;
log(result);
/**
 * когда у вас сложное формирования строки
 * допустим у вас 3 переменные и нужно как то их запихать
 * в одну строку с пробелами и всякой инфой
 * то приходит на помощь еще один способ создвания строки
 */
const magicStr = `Это косые ковычки`;
/**
 * но главная ее особеность
 * мы можем в любое место этой строки вставлять переменные
 */

const name = "Pavel";
const age = "30";
const info = `Ваше имя ${name}, а ваш возраст ${age}`;

log(info);
/**
 * с помощью магических символов ${Име переменной}
 * мы можем формировать любые строки что очень круто
 */
/**
 * Потыкайте тут строки:
 * 1. создайте строки где будут использоваться три переменные через ${}
 * 2. попробуйте перенести строки на несколько строк, пример
 *  const name = "dfdf
 *                  dfd";
 * посмотрите что будет.
 * Сделайте это со всеми остальными вариантами создания строк. Есть ли отличия?
 */

/**
 * уже имеются разные встроенные методы работы со строками, с ними можно познакомиться тут:
 * https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String
 * 
 * для примера давайте сделаем все буквы в слове с большой буквы 
 */
log('pavel'.toUpperCase());
/**
 * потыкайте методы:
 * - match
 * - replace
 * - slice
 * - split
 * да и вообще все что есть в доке MDN
 */