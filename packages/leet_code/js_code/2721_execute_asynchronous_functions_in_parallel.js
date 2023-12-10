/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAll = function (functions) {
  let result = [];
  let promiseCount = functions.length;
  return new Promise((res, rej) => {
    functions.forEach((promise, index) => {
      promise()
        .then((data) => {
          promiseCount = promiseCount - 1;
          result[index] = data;
          if (promiseCount === 0) {
            res(result);
          }
        })
        .catch((error) => {
          rej(error);
        });
    });
  });
};

promiseAll([() => new Promise((res) => res(42))]).then((data) => {
  data; //=
});

promiseAll([
  () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
]).then((data) => {
  data; //=
});

promiseAll([
  () => new Promise((resolve) => setTimeout(() => resolve(1), 200)),
  () =>
    new Promise((resolve, reject) => setTimeout(() => reject('Error'), 100)),
])
  .then((data) => {
    data; //=
  })
  .catch((e) => {
    e; //=
  });

  