/* Замена суперкласса делегатом
  Replace Superclass with Delegate
*/
// before
class List {}
class Stack extends List {}
// after
class Stack {
  constructor() {
    this._storage = new List();
  }
}
class List {};

/* Мотивация
*/