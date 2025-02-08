// In your code, the myMap method is enumerable by default because you’re adding it to
// Array.prototype using a direct assignment (Array.prototype.myMap = ...).
// This makes it appear in for...in loops over array instances, which is not how native array methods behave.


Object.defineProperty(Array.prototype, 'myMap', {
  value: function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    const result = [];
    for (let i = 0; i < this.length; i++) {
      result.push(callback.call(this, this[i], i, this));
    }
    return result;
  },
  writable: true,
  configurable: true,
  enumerable: false // 👈 Makes it non-enumerable!
});
