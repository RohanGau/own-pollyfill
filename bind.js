Function.prototype.myBind = function(context, ...args) {
     // Ensure the method is called on a function
      if (typeof this !== 'function') {
        throw new TypeError('myBind must be called on a function.');
      }
    
      // Set the context to the global object if null or undefined
      context = context !== null && context !== undefined ? Object(context) : globalThis;
    
      // Store a reference to the original function
      const originalFunction = this;
    
      // Return a bound function
      return function boundFunction(...additionalArgs) {
        // Preserve the context and combine the arguments
        return originalFunction.apply(context, [...args, ...additionalArgs]);
      };
}
