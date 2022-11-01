/* Извлечение суперкласса
  Extract Superclass
*/
// before
class Department {
  get totalAnnualCost() {}
  get name() {}
  get headCount() {}
}
class Employee {
  get annualCost() {}
  get name() {}
  get id() {}
}
// after
class Party {
  get name() {}
  get annualCost() {}
}
class Department extends Party {
  get annualCost() {}
  get headCount() {}
}
class Employee extends Party {
  get annualCost() {}
  get id() {}
}

/* Мотивация

  Определив, что два класса делают похожие вещи, можно воспользоваться
  преимуществами механизма наследования, чтобы объединить их сходства в
  суперкласс.
*/