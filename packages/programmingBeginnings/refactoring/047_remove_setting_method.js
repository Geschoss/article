/* Удаление метода устрановки значения
  Remove Setting Method
*/
// before
class Person {
  get name() {};
  set name(sString) {};
}
// after
class Person_a {
  get name() {};
}

/* Мотивация

  Если данные не меняются в процессе работы, то можно не делать
  для них сетторы
*/
