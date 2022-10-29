/* Опускаем метод
  Push Down Method
*/
// before
class Employee {
  get quote() {};
}
class Engineer extends Employee {}
class Salesman extends Employer {}
// after
class Employee {}
class Engineer extends Employee {}
class Salesman extends Employee {
  get quote() {}
}

/* Мотивация

  Если имеет отношение только к под классу, то для большего
  понимания кода лучше его перенести в подкласс
*/