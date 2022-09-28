/* Объединение функций в преобразование
    (Combine Fubctions into Transform)
*/

// after
function base(aReading) {};
function taxableCharge(aReading) {};

function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}

/* Мотивация 

  Часто передаем данные в программы, которые вычисляют на их основе 
  различную произвольную информация. Эти вычисляемые значения могут 
  понадобиться в нескольких местах, так что вычисления часто 
  повторяются везде, где используются эти произвольные данные.
*/