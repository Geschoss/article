/* Замена ссылки значением
  Change Reference to Value
*/
// before
class Product_b {
  applyDiscount(arg) {
    this._price.amount -= arg;
  }
}
// after
class Product {
  applyDicount(arg) {
    this._price =
      new Money(this._price.amount - arg, this._price.currency);
  }
}

/* Мотивация

  Иногда иммутабельность это круто
*/
