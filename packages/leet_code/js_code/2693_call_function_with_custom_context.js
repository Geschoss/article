/**
 * @param {Object} context
 * @param {Array} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function(context, ...args) {
    return this.apply(context, args)
}

// function increment() { this.count++; return this.count; }
function increment(x, y) { this.count++; return this.count + x + y; }
increment.callPolyfill({count: 1}, 5, 6); //= //2
