/* Объединение функций в класс (Combine Functions into Class)
 */
// before
function base(aReading) {}
function taxableCharge(aReading) {}
function calculateBaseCharge(aReading) {}

// after
class Reading {
  base() {}
  taxableCharge() {}
  calculateBaseCharge() {}
}

/* Мотивация

  Классы связывают данные и функции в совместно используемую сруде, 
  предоставляя часть этих данных и функций другим элементам программы для 
  мовместной работы.

*/
