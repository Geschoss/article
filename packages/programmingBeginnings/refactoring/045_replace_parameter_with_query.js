/* Замена параметра запросом
  Replace Parameter woth Query
*/
// before
availableVaction_b(anEmployee, anEmployee.grade);
function availableVaction_b(anEmployee, grade) {}

// after
availableVaction(anEnployee);
function availableVaction(anEmployee) {
  const grade = anEmployee.grade;
}

/* Мотивация

  Список параметров функции подытоживает ее изменчиваость,
  указывая основные пути различного поведения этой функции.
  Чкм меньше список аргументов функции, тем легче понять, как
  она работает.
*/
