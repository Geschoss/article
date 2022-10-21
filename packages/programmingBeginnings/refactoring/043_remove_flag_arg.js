/* Удаление аргумента-флага
  Remove Flag Rgument
*/
// before
function setDimension(name, value) {
  if (name === "height") {
    this._height = value;
    return;
  }
  if (name === "width") {
    this._width = value;
    return;
  }
}
// after
function setHeight(value) {
  this._height = value;
}
function setWidth(value) {
  this._width = value;
}

/* Мотивация


  Аргумент-флаг - это аргумент функции, который вызывающая функция
  использует, что бы указать, какаю именно логику должна выполнять
  вызываемая функция.
*/