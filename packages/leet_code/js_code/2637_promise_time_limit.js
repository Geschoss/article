/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  let exceeded = false;
  return async function (...args) {
    return new Promise((res, reject) => {
      const timeoutID = setTimeout(() => {
        exceeded = true;
        reject('Time Limit Exceeded');
      }, t);
      fn(...args)
        .then((data) => {
          clearTimeout(timeoutID);
          if (!exceeded) {
            res(data);
          }
        })
        .catch((e) => {
          clearTimeout(timeoutID);
          if (!exceeded) {
            reject(e);
          }
        });
    });
  };
};

const limited = timeLimit(
  (t) =>
    new Promise((res) => {
      //   throw new Error('hello');
      setTimeout(() => res(12), t);
    }),
  100
);
limited(150)
  .then((d) => console.log(d))
  .catch((e) => console.log(e)); // "Time Limit Exceeded" at t=100ms
