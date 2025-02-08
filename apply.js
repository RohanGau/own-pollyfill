Function.prototype.myApply = function(context, args) {
  // Ensure the method is called on a function
  if(typeof this !== 'function') {
    throw new TypeError('myApply must be called on a function.');
  }

  // Set the context to the global object if null or undefined
  const context = (context !== null && context !== undefined) ? Object(context) : globalThis;
  // check wheather second argument is an array or not
  if(!Array.isArray(args)) throw new Error('second argument should be an array');
  // Use a unique key to avoid property collisions
  const uniqueKey = Symbol('__tempFund');
  context[uniqueKey] = this;
  
  // Invoke the function with the provided context and arguments
  const result = context[uniqueKey](...args);
  
  // Clean up the temporary property
  delete context[uniqueKey];
  return result;
}
