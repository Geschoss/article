/* Отделение запроса от модификатора
  Separate Query from Modifier
*/
// before
function getTotalOutstandingAndBill() {
  const result = customer.invoices.reduce(
    (total, each) => each.amount + total,
    0
  );
  sendBill();
  return result;
}
// after
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}
function sendBill() {
  emailGateway.send(formatBill(customer));
}
/* Мотивация

  Функция, возвращающая значение и не имеющая видимых побочных действий,
  - весьма ценная вещь: я могу вызывать ее так часто, как захочу,
  могу перемещать ее вызов в другие места вызывающей функции, а еще ее
  лугче тестировать. Словом, с такой функцией гораздо меньше поводов
  для беспокойства.
*/
