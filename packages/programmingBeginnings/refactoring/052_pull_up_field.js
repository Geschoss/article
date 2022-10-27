/* Подъем поля
  Pull Up Field
*/
// before
class Employee {}
class Salesman extends Employee {
  name;
}
class Engineer extends Employee {
  name;
}
// after
class Employee {
  name;
}
class Salesman extends Employee {}
class Engineer extends Employee {}

/* Мотивация
*/
