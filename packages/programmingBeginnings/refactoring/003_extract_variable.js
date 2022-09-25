/* Извлечение переменной (Extract Variable)

  Бывший рефакторинг _Введение поясняющей переменной_
  Обратные к рефакторингу _Встраивание переменной_

*/

// before
function foo_b(order) {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 100)
  );
}
// after
function foo_a(order) {
  const basePrice = order.quantity * order.itemPrice;
  const quantityDiscount =
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const shipping = Math.min(basePrice * 0.1, 100);
  return basePrice - quantityDiscount + shipping;
}

/* Мотивация

  Вырахения могут быть очень сложными и трудными для чтения.
  В таких случаях имеет смысл с помощью локальных переменных превратить 
  выражение в нечето, лучше поддающееся пониманию и управлению.
*/
