/* Введение объекта параметра (Introduce Parameter Object)
 */
// before
function amountInvoiced(startData, endDate) {}
function amountReceived(startDate, endDate) {}
function amountOverdue(startDate, endDate) {}

// after
function amountInvoiced_a(aDateRange) {}
function amountReceiver_a(aDateRange) {}
function amountOverdue_a(aDateRange) {}

/* Мотивация

  Преимущество группировки данных в структуру является то, что она 
  делает явной между этими данными.
  Обеспечение возможности более глубоких изменений кода.
*/