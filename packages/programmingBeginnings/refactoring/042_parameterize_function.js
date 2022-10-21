/* Параметризация функция
  Parameterize Function
*/
// before
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}
function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
// after
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}

/* Мотивация

  Обнаружив две функции со схожей логикой, но с разными литеральными
  значениями, я могу удалить диблирование, используя однк функцию
  с параметрами для разных значений.
*/