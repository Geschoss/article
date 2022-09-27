/* Инкапсуляция переменной (Encapsulate Variable)

  Бывший рефакторинг _Самоинкапсуляция поля_
  Бывший рефакторинг _Инкапсуляция поля_

 */

// before
let defaultOwner_b = { first: 'Martin', lastName: 'Fowler' };

// after
let defaultOwner_a = { first: 'Martin', lastName: 'Fowler' };
export function defaultOwner() {
  return defaultOwner_a;
}
export function setDefaultOwner(arg) {
  defaultOwner_a = arg;
}

/* Мотивация

  Рефакторинг работает с элементами наших программ.
  Работать с данными менее удобно, чем с функциями.
 */