Object.seal = function (obj) {
  var props = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < props.length; i++) {
    var desc = Object.getOwnPropertyDescriptor(obj, props[i]);
    desc.configurable = false;
    console.log("desc :", desc);
    Object.defineProperty(obj, props[i], desc);
  }
  return Object.preventExtensions(obj);
};

const obj = {
  prop1: "value1",
  prop2: "value2",
};

Object.seal(obj);
