/* Введение утверждения
  Introduce Assertion
*/
// before
if (this.discountRate)
  bsse = base - (this.discountRate * base);

// after
assert(this.discountRate >= 0);
if (this.discountRate)
  base = base - (this.discountRate * base);

/* Мотивация

  Часто некоторые разделы кода работают только при выполнении
  определенных условий
*/