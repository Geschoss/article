/* Сокрытия делегата
  Hide Delegate
*/

// before
let manager_b = aPerson.department.manager;

// after
let manager = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}

/* Мотивация

  Инкапсуляция
  Модули должны знать о других частях системы как можно меньше
*/
