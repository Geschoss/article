let { textStatement, htmlStatement } = require('./main.js');
let { plays, invoices } = require('./data.js');

test('statement text', (expect) => {
  let result = textStatement(invoices[0], plays);
  expect(result).toBe(
    `Statement for BigCo
 Hamlet: $4,250.00 (55 seats)
 As You like It: $580.00 (35 seats)
 Othello: $4,100.00 (40 seats)
Amount owed is $8,930.00
You earned 47 credits
`
  );
});

test('statement text', (expect) => {
  let result = textStatement(invoices[1], plays);
  expect(result).toBe(
    `Statement for Pako
 Hamlet: $4,930.00 (123 seats)
 As You like It: $740.00 (55 seats)
 Othello: $4,000.00 (10 seats)
Amount owed is $9,670.00
You earned 129 credits
`
  );
});

test('statement html', (expect) => {
  let result = htmlStatement(invoices[1], plays);
  expect(result).toBe(
    `<h1>Statement for Pako</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr>
 <tr><td>Hamlet</td><td>123</td><td>$493,000.00</td></tr>
 <tr><td>As You like It</td><td>55</td><td>$74,000.00</td></tr>
 <tr><td>Othello</td><td>10</td><td>$400,000.00</td></tr>
</table>
<p>Amount owed is <em>$967,000.00</em></p>
<p>You earned <em>129</em> credits</p>`
  );
});
