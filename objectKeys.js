Object.keys = function (obj) {
  const keys = [];
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      keys.push(prop);
    }
  }

  return keys;
};

const test = {
  name: "rohan",
  graduation: "bachelors",
  state: "uttar pradesh",
  pincode: 201005,
};

console.log(Object.keys(test));
