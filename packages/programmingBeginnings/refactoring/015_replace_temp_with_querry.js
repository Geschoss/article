/* Замена временной переменной запросом
  (Replace Temp with Query)
*/
// before
const basePrice_b = this._quantity * this._itemPrice;
if(basePrice_b > 1000)
  return basePrice * 0.95;
else
  return basePrice * 0.98;

// after
class Some {
  get basePrice() {
    this._quantity * this._itemPrice;
  }
}
//...
if (this.basePrice > 1000)
  return this.basePrice * 0.95
else
  return this.basePrice * 0.98;

/* Мотивация

  Хранение некоторого вычисленного кодом значения для последующего 
  обращения к нему в функции.
*/