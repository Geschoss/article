/* Замена примитива объектом (Replace Primitive with Object)
*/
// before
orders.filter(o => "high" === o.priority || "rush" === o.priority);
// after
order.filter(o => o.priority.higherThan(new Priority("normal")));

/* Мотивация

  Простые элементы данные заворачиваем в класс.
  Избегание дублирования, упрощает поиск, упрощает рефакторинг
*/