const { sum } = require('./sum.js');

test('sum: test 1 + 2 = 3', (expect) => {
  expect(sum(1, 2)).toBe(3);
});
