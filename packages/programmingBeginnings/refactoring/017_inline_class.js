/* Встраивание класса
  Inline Class
*/
// before
class Person_b {
  get officeAreaCode() {
    return this._telephoneNumber.areaCode;
  }
  get offceNumber() {
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
// after
class Person {
  get officeAreaCode() {
    return this._officeAreaCode;
  }
  get officeNumber() {
    return this._officeNumber;
  }
}

/* Мотивация

  Когда класс невелик и больше не должен быть отдельным классом.
  Преобразование классов в другие классы.
*/
