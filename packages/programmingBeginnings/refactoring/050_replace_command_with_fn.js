/* Замена команды функцией
  Replace Command with Function
*/
// before
class ChargeCalculator {
  constructor(customer, usage) {
    this._customer = customer;
    this._usage = usage;
  }
  execute() {
    return this._customer.rate * this._usage;
  }
}
// after
function charge(customer, usage) {
  return customer.rate * usage;
}

/* Мотивация


  В большинстве случаев мне достаточно просто вызывать функцию и
  заставить ее делать свое дело.
*/