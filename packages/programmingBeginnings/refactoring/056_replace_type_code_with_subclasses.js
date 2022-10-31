/* Замена кода типа подклассами
  Replace Type Code with Subclasses
*/
// before
function createEmployee(name, type) {
  return new Employee(name, type);
}
// after
function createEmployee(name, type) {
  switch (type) {
    case 'engineer':
      return new Engineer(name);
    case 'salesman':
      return new Salesman(name);
    case 'manager':
      return new Manager(name);
  }
}

/* Мотивация

  Разнесение логики в нужное место.
*/