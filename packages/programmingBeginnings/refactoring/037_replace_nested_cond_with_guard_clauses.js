/* Замена вложенных условных конструкций граничным оператором
  Replace Nested Conditional with Guard Clauses
*/
// before
function getPayAmount_b() {
  let result;
  if (isDead) result = deadAmount();
  else {
    if (isSeparated) result = separatedAmount();
    else {
      if (isRetired) result = retiredAmount();
      else result = normalPayAmount();
    }
  }
  return result;
}
// after
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}

/* Мотивация

  виды условных выражений:
  - все ветки являются частью номрального поведения
  - есть как нормальное поведение, так и ветка которая описывает
    некоторые необычные условия. (граничны оператором|guard clause)
*/
