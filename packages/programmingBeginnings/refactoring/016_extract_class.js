/* Извлечение класса (Extract class)
 */
// before
class Person_b {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}

// after
class Person {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get officeNumber() {
    return this._telephoneNumber.number;
  }
}
class TelephoneNumber {
  get areaCode() {
    return this._areaCode;
  }
  get number() {
    return this._number;
  }
}
/* Мотивация

  Разрастание класса приводит к плохой поддержки
*/