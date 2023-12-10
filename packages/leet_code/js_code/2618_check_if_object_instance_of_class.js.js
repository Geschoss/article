/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (
    obj != null &&
    typeof classFunction === 'function' &&
    Object(obj) instanceof classFunction
  ) {
    return true;
  }

  return false;
};

class Animal {}
class Dog extends Animal {}
checkIfInstanceOf(new Dog(), Animal); //= //true
checkIfInstanceOf(new Date(), Date); //= //true
checkIfInstanceOf(Date, Date); //=
checkIfInstanceOf(5, Number); //=
