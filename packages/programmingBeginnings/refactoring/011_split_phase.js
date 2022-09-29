/* Разделение этапа (Split Phase)
*/

// before
const orderData_b = orderString.split(/\s+/);
const productPrice_b = priceList[orderData[0].split("-")[1]];
const orderPrice_b = parseInt(orderData[1]) * productPrice;

// after
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);

  return ({
    productID: values[0].split("-")[1],
    quantity: parseInt(values[1]),
  });
}
function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}

/* Мотивация

  Когда я сталкиваюсь с кодом, который имеет дело с двумя разными 
  задачами, я ищу способ разделить его на отдельные модули.
*/