Function.prototype.myCall = function(context, ...args) {
    // Ensure the method is called on a function
    if (typeof this !== 'function') {
        throw new TypeError('myCall must be called on a function.');
    }

    // Set the context to the global object if null or undefined
    context = context !== null && context !== undefined ? Object(context) : globalThis;

    // Use a unique key to avoid property collisions
    const uniqueKey = Symbol('tempFn');
    context[uniqueKey] = this;

    // Invoke the function with the provided context and arguments
    const result = context[uniqueKey](...args);

    // Clean up the temporary property
    delete context[uniqueKey];

    // Return the result
    return result;
};
