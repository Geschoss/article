/* Подъем метода
  Pull Up Method
*/
// before
class Employee {}
class Salesman extends Employee {
  get name() {}
}
class Engineer extends Employee {
  get name() {}
}
// after
class Employee_a {
  get name() {}
}
class Salesman_a extends Employee_a {}
class Engineer_a extends Employee_a {}

/* Мотивация

  Устранение дублирования поведения - важная работа.
*/
