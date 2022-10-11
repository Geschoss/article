/* Замена цикла конвейером
  Replace Loop with Pipeline
*/
// before
const names_b = [];
for (const i of input) {
  if (i.job === 'programmer') {
    names.push(i.name);
  }
}
// after
const names = input
    .filter((i) => i.job === 'programmer')
    .map((i) => i.name);

/* Мотивация

  Циклы лучше заменить конвейером коллекций
*/


