/* Инкапсуляция записи (Encapsulate Record)

  Бывший рефакторинг _ Замена записи классом данных
*/
// before
let organization = { name: 'Acme Gooseberries', country: 'GB' };

// after
class Organization {
  counstructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {
    return this._name;
  }
  set name(arg) {
    this._name = arg;
  }
  get country() {
    return this._country;
  }
  set country(arg) {
    this._country = arg;
  }
}

/* Мотивация

  Пользователю объекта не нужно знать или заботиться о том, 
  что в нем храниться; достаточно знать, что рассчитывается.
  Помогает рефакторить код внутри.
*/
