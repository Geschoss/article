/* Подстановка алгоритма
  (Substitute Algorithm)
*/
// before
function foundPerson_b(people) {
  for (let i = 0; i < people.length; i++) {
    if (people[i] === "Don") {
      return "Don"
    }
    if (people[i] === "John") {
      return "John";
    }
    if (people[i] === "Kent") {
      return "Kent";
    }
  }
  return "";
}
// after
function foundPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find(p => candidates.includes(p)) || '';
}

/* Мотиваци

  Разбить нечто сложное на более простые части.
*/