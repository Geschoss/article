/* Встраивание функции (Inline Function)

  Бывший рефакторинг _Встраивание метода_
  Обратный к рефакторингу _Извлечение функции_
*/

// before
function getRating_b(driver) {
  return moreThanFiveLateDeliveries(driver) ? 2 : 1;
}
function moreThanFiveLateDeliveries(driver) {
  return driver.numberOfLateDeliveries > 5;
}
// after
function getRating_a(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}

/* Мотиваци

  Тела которых так же очевидны, как и названия.
  
*/
