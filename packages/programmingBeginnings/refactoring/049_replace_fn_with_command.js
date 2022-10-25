/* Замена функции командой
  Replace Function with Command
*/
// before
function score(candidate, medicalExam, scooringGuide) {
  let result = 0;
  let healthLevel = 0;
  // Длинный код тела функции
}
// after
class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this._candidate = candidate;
    this._medicalExam = medicalExam;
    this._scoringGuied = scoringGuied;
  }
  execute() {
    this._result = 0;
    this._healthLevel = 0;
    // Длинный код тела функции
  }
}

/* Мотивация

  Обеспечивает большую гибкость, чем простой механизм функции.
  Команды могут иметь дополнительные операции, такие как отмена
  действий и возврат к предыдущему состоянию.
*/