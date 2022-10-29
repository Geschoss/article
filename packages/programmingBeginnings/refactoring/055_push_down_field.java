/* Опускание поля
  Push Down Field
*/
// before
class Employee {
  private String quota;
}
class Engineer extends Employee {}
class Salesman extends Employee {}
// after
class Employee {}
class Engineer extends Employee {}
class Salesman extends Employee {
  protected String quota;
}

/* Мотивация

  Если полу используется только одним подклассом, я перемещаю
  его в эти подклассы
*/