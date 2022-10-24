/* Замена запроса параметром
  Replace Query with Parameter
*/
// before
targetTemperature(aPlan);

function targetTemperature(aPlan) {
  currentTemperature = thermostat.currentTemperature;
  // остальной код функции
}
// after
targetTemperature(aPlan, thermostat.currentTemperature);

function targetTemperature(aPlan, currentTemperature) {
  // Остальной код функции
}

/* Мотивация

  Идти в сторону чистых функций
*/