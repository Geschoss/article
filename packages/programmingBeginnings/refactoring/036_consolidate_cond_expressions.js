/* Объединение условного выражения
  Consolidate Conditional Expression
*/
// before
if (anEmplouee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
// after
if (isNotEligableForDisability()) return 0;

function isNotEligableForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthDisabled > 12 ||
    anEmployee.isPartTime
  );
}

/* Мотивация

  Иногда приходится сталкиваться с серией проверок условий,
  где каждая проверка отлична от других, но результат действий одинаков.
  Обнаружив такой код, я использую операторы И и ИЛИ, что бы объединить
  условия в одно, с одним результатом.
*/
