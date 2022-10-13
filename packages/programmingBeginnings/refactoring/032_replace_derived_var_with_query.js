/* Замена высисленной переменной запросом
  Replace Derived \varible with Query
*/
// before
class B {
  get discountedTotal() {
    return this._discountedTotal;
  }
  set discount(aNumber) {
    const old = this._discount;
    this._discount = aNumber;
    this._discountedTotal += old - aNumber;
  }
}

// after
class A {
  get discountedTotal() {
    return this._baseTotal - this._discount;
  }
  set discount(aNumber) {
    this._discount = aNumber;
  }
}

/* Мотивация

  Одним из крпнейших источников проблем в программном обеспечении
  является изменяемые данные.
  - удалить любые переменные, которые можно легко вычислить.
*/