Object.create = function (proto, props) {
  var obj = new Object();
  obj.prototype = proto;
  if (typeof props !== undefined) {
    Object.defineProperties(obj, props);
  }
  return obj;
};

Object.create = function (proto, props) {
  var destor = function (ps) {
    if (ps) {
      Object.defineProperty(this, ps);
    }
  };
  destor.prototype = proto;
  return new destor(props);
};
