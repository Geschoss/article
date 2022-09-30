/* Инкапсулфция коллекция (Encapsulate Collection)
*/

// before
class Person_b {
  get courses() { return this._courses;}
  set courses(aList) { this._courses = aList;}
}
// after
class Person {
  get courses() { return this._courses.slice();}
  addCourse(aCourse) {}
  removeCourse(aCourse) {}
}

/* Мотивация

  Облегчает понимание того, когда и как изменяются структуры данных
  Облегчает изменения этих структур данных при необходимости
*/