Object.create = function (proto, props) {
  var obj = new Object();
  obj.prototype = proto;
  if (typeof props !== undefined) {
    Object.defineProperties(obj, props);
  }
  return obj;
};
