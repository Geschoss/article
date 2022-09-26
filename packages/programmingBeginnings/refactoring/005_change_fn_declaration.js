/* Изменение объявления функции (Change Function declaration)

  Он же _Переименование функции_
  Бывший рефакторинг _ Переименование метода_
  Бывший рефакторинг _ Добавление параметра_
  Бывший рефакторинг _Удаление параметра_
  он же _Изменение сигнатуры_

 */

// before
function circum(radius) {}

// after
function circumrefence(radius) {}

/* Мотивация

  Избавления от злого демона _Обфускатиса_

 */

// More examples
function circum(radius) {
  return circumrefence(radius);
}
function circumrefence(radius) {
  return 2 * Math.PI * radius;
}
// --
class Book {
  addReservation(customer) {
    this._reservations.push(customer);
  }
}

class Book {
  addReservation(customer) {
    this._reservations.push(customer, false);
  }

  zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false);
    this._reservations.push(customer);
  }
}
