/* Перенос поля
  Move Field
*/

// before
class Customer_a {
  get paln() {
    return this._plan;
  }
  get discountRate() {
    return this._discountRate;
  }
}
// after
class Customer {
  get plan() {
    return this._plan;
  }
  get discountRate() {
    return this.plan.discountRate;
  }
}

/* Мотивация

  Настоящая сила программы основана на ее структурах данных.
  Все изменения и данные в одном месте
*/
