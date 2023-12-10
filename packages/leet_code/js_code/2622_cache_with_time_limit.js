// var TimeLimitedCache = function () {
//   this.chache = {};
// };

// /**
//  * @param {number} key
//  * @param {number} value
//  * @param {number} duration time until expiration in ms
//  * @return {boolean} if un-expired key already existed
//  */
// TimeLimitedCache.prototype.set = function (key, value, duration) {
//   var data = this.chache[key];
//   if (data) {
//     clearTimeout(data.timerId);
//     makeKey(this.chache, data, key, value, duration);
//     return true;
//   }
//   makeKey(this.chache, {}, key, value, duration);
//   return false;
// };
// function makeKey(chache, data, key, value, duration) {
//   data.value = value;
//   data.timerId = setTimeout(() => {
//     delete chache[key];
//   }, duration);
//   chache[key] = data;
// }
// /**
//  * @param {number} key
//  * @return {number} value associated with key
//  */
// TimeLimitedCache.prototype.get = function (key) {
//   return this.chache[key]?.value || -1;
// };

// /**
//  * @return {number} count of non-expired keys
//  */
// TimeLimitedCache.prototype.count = function () {
//   return Object.keys(this.chache).length;
// };
class TimeLimitedCache {
  cache = new Map();

  set(key, value, duration) {
    if (this.cache.has(key) && this.cache.get(key).expiration > Date.now()) {
      this.cache.set(key, { value, expiration: Date.now() + duration });
      return true;
    }
    this.cache.set(key, { value, expiration: Date.now() + duration });
    return false;
  }

  get(key) {
    if (this.cache.has(key) && this.cache.get(key).expiration > Date.now()) {
      return this.cache.get(key).value;
    } else {
      return -1;
    }
  }

  count() {
    let count = 0;
    for (const key of this.cache.keys()) {
      if (this.cache.get(key).expiration > Date.now()) {
        count++;
      }
    }
    return count;
  }
}

const timeLimitedCache = new TimeLimitedCache();
timeLimitedCache.set(1, 42, 300); //= // false
timeLimitedCache.set(2, 52, 500); //= // false
timeLimitedCache.set(3, 52, 300); //= // false
timeLimitedCache.get(1); //=  // 42
timeLimitedCache.get(2); //=  // 52
timeLimitedCache.get(3); //=  // 52
timeLimitedCache.set(3, 52, 600); //= // true
timeLimitedCache.count(); //=  // 1
setTimeout(() => {
  timeLimitedCache.get(1); //=  // 42
  timeLimitedCache.get(2); //=  // 52
  timeLimitedCache.get(3); //=  // 52
  timeLimitedCache.count(); //=  // 1
}, 300);
