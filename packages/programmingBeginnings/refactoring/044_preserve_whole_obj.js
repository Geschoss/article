/* Сохранение всего объекта
  Preserve Whole Object
*/
// before
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTemoRange.hight;
if (aPlan.withinRange(low, high)) {
}

// after
if (aPlan.withinRange(aRoom.daysTempRange)) {
}

/* Мотивация

  Заменять значения из записи на вю запись.
  Пусть функция сама решает что ей нужно из объекта
*/