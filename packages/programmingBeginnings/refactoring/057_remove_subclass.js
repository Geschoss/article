/* Удаление подкласса
  Remove Subclass
*/
// before
class Person {
  get genderCode() {
    return 'X';
  }
}
class Male extends Person {
  get genderCode() {
    return 'M';
  }
}
class Female extends Person {
  get genderCode() {
    return 'F';
  }
}
// after
class Person {
  get genderCode() {
    return this._genderCode();
  }
}

/*

  Подкласс, который делает слишком мало, вдечет за собой затраты на 
  понимание, которое больше не требуется.
*/