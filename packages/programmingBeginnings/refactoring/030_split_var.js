/* Расцепление переменной
  Split Varible
*/
// before
let temp = 2 * (height + width);
console.log(temp);
temp = height * width;
console.log(temp);
// after
const perimeter = 2 * (height + width)
console.log(perimeter);
const area = height * width;
console.log(area);

/* Мотивация

  Любая переменная с более чем одной ответственностью должна
  быть заменена несколькими переменными, по одной для
  каждой ответственности.
*/