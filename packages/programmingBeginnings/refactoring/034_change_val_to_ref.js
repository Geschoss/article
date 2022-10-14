/* Замена значения ссылкой
  Change Value to Reference
*/
// before
let customer_b = new Customer(customerData);
// after
let customer = customerRepository.get(customerData.id);

/* Мотивация

  Структура данных может иметь несколько записей, связанных с одной
  и той же логикой структурой данных.
  либо один инстанц и много ссылок.
  либо много инстанцев
*/
