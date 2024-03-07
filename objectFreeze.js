function freeze(obj) {
  // Get an array of an property name of the object
  var props = Object.getOwnPropertyNames(obj);
  // loop the each property
  for (let i = 0; i < props.length; i++) {
    // get the property descriptor of the current property
    var desc = Object.getOwnPropertyDescriptor(obj, props[i]);
    // if the property has a value make it non-writable
    if ("value" in desc) {
      desc.writable = false;
      // make it property no configurable
      desc.configurable = false;
    }
    // define the property with the updated descriptor
    Object.defineProperty(obj, props[i], desc);
  }
  return Object.preventExtensions(obj);
}

const object = {
  firstName: "Rohan",
  lastName: "Kumar",
};
freeze(object);
object.firstName = "Rakesh";
console.log(object);
