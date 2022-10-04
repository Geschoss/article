/* Удаление посредника
  Remove Middle Man
*/
// before
let manager_b = aPerson.manager;
class Person {
  get manager() {
    return this.department.manager;
  }
}
// after
let manager = aPerson.department.manager;

/* Мотивация

  Пересылка начинает раздражать.
  Возможно пришло время клиенту работать с делегатом непосредственно.
*/