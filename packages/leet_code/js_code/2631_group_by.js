/**
 * @param {Function} fn
 * @return {Object}
 */
Array.prototype.groupBy = function (fn) {
  let result = {};
  this.forEach((item) => {
    let value = fn(item);
    if (value in result) {
      result[value].push(item);
    } else {
      result[value] = [item];
    }
  });
  return result;
};

// {"1":[1],"2":[2],"3":[3]}
[1, 2, 3].groupBy(String); /*= */

// { "1": [{"id": "1"}, {"id": "1"}],   "2": [{"id": "2"}] }
[{ id: '1' }, { id: '1' }, { id: '2' }].groupBy((item) => item.id); /*= */

// {"1": [[1, 2, 3], [1, 3, 5], [1, 5, 9]] }
[
  [1, 2, 3],
  [1, 3, 5],
  [1, 5, 9],
].groupBy((list) => String(list[0])); /*= */
