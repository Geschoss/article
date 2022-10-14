/* Декомпозиция условной инструкции
    Decompose Conditional
*/
// before
if (!aDate.isBefore(plan.summerStart) &&
      !aDate.isAfter(plan.summerEnd))
  change = quantity * plan.summerRate;
else
  change = quantity * plan.regularRate
          + plan.regularServiceCharge;
// after
if (summer())
  charge = summerCharge();
else
  charge = regularCharge();

/* Мотивация

  Одним из наиболее распространенных исторчникоа сложности в программе
  является сложная условная логика.
  Код обычно сообщает о том, что происходит, но может легко скрыть,
  почему это происходит.
  
*/