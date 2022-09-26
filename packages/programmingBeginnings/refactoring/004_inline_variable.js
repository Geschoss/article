/* Встраивание переменной (Inline Varible)

  Бывший рефакторинг _Встраивание временной перменной_
  Обратный к рефакторингу _Извлечение переменной_

*/

// before
function foo_a(anOrder) {
  let basePrice = anOrder.basePrice;
  return basePrice > 1000;
}

// after
function foo_b(anOrder) {
  return anOrder.basePrice > 1000;
}

/* Мотивация

  Иногда в действительности имя не говорит больше, чем само выражение.

  */
