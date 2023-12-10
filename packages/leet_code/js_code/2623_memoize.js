/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  let cash = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cash.hasOwnProperty(key)) {
        return cash[key];
    }
    const result = fn(...args);
    cash[key]= result;
    return result;
  };
}

let callCount = 0;
const memoizedFn = memoize(function (a, b) {
  callCount += 1;
  return a + b;
});
memoizedFn(2, 3); /*= */ // 5
memoizedFn(2, 3); /*= */ // 5
console.log(callCount); // 1
