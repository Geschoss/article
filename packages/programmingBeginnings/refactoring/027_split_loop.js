/* Разделеине цикла
  Split Loop
*/
// before
let averageAge_b = 0;
let totalSalary_b = 0;
for (const p of people) {
  avarageAge_b += p.age;
  totalSalary_b += p.salary;
}
averageAge = averageAge_b / people.length;
// after
let totalSalary = 0;
for (const p of people) {
  totalSalary += p.salary;
}
let averageAge = 0;
for (const p of people) {
  averageAge += p.age;
}
averageAge = averageAge / people.length;

/* Мотивация

  Циклы это не самая главное проблема в производительности.
*/