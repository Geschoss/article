/* Извлечение функции (Extract Function)
  
  Бывший рефакторинг _Извлечение метода_
  Обратный к рефакторингу _Встраивание функции_

*/

// before
function printOwing_b(invoice) {
  printBanner();
  let outstanding = calculateOutstandiing();

  console.log(`name: ${invoce.customer}`);
  consol.elog(`amount: ${outstanding}`)
}
// after
function printOwing_a(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();
  printDetails(outstanding);

  function printDetails(outstanding) {
    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
  }
}


/* Мотивация

  Разделение между намерением и реализацией.
  
  Если вам приходтся тратить время и силы на просмотр фрагмента кода и 
  выяснением, _что_ он делает, - выдолжны извлечь его в функцию и 
  назвать функцию этим _что_.

  Находим фрагмент кода, разбираемся, как он работает,
  и преобразовываем этот фрагмент кода в отдельную функцию с именем,
  указывающим ее предназначение.

*/