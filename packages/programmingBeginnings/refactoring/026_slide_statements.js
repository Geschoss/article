/* Перемещение инструкций
  Slide Statements
*/
// before
const pricengPlan_b = retrievePricingPlan();
const order_b = retreiveOrder();
let charge_b;
const chargePerUnit_b = pricingPlan.unit;
// after
const pricengPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;

/* Мотивация

  Код легче понять, когда связанные друг с другом фрагменты
  находятся рядом.
  
*/