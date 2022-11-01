/* Свертывание иерархии
  Collapse Hierarchy
*/
// before
class Employee {}
class Salesman extends Employee {}
// after
class Employee {}

/* Мотивация

  Когда класс и его родительский элемент уже недостаточно различаются,
  что бы их имело смысл разделять, я объединию их вместе.
*/