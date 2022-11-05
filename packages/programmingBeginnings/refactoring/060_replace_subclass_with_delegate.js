/* Замена подкласса делегатом
  Replace Subclass with Delegate
*/
// before
class Order {
  get daysToShip() {
    return this._warehouse.daysToShip;
  }
}
class PriorityOrder extends Order {
  get daysToShip() {
    return this._proirutyPlan.daysToShip;
  }
}
// after
class Order {
  get daysToShip() {
    return this._priorityDelegate
      ? this._priorityDelegate.daysToShip
      : this._warehouse.daysToShip;
  }
}

class PriorityOrderDelegate {
  get daysToShip() {
    return this._priorityPlan.daysToShip;
  }
}

/* Мотивация

  Наследование не панацея и иногда нужно заменить это все делегатом
*/