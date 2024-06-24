console.log("script call")

class AysncTask {
  constructor(executor) {
    this.callBacks = [];
    this.catchCallBacks = [];
    this.state = 'pending';
    this.result = null;

    const resolve = (value) => {
      if(this.state === "pending") {
        this.state = "fulfilled";
        this.result = value;
        this.callBacks.forEach((callBack) => callBack(value));
      }
    }

    const reject = (reason) => {
      if(this.state === "pending") {
        this.state = "rejected";
        this.result = reason;
        this.catchCallBacks.forEach((callBack) => callBack(reason));
      }
    }

    try {
      executor(resolve, reject);
    } catch(error) {
      reject(error);
    }
  }
  
  then(onFulFilled) {
    return new AysncTask((resolve, reject) => {
      const wrappedOnFulFilled = (value) => {
        try {
          resolve(onFulFilled(value))
        } catch(error) {
          reject(error)
        }
      }
      if(this.state === "fulfilled") {
        wrappedOnFulFilled(this.result);
      } else if(this.state === "pending") {
        this.callBacks.push(wrappedOnFulFilled);
      }
    })
  }

  catch(onRejected) {
    if(this.state === "rejected") {
      onRejected(this.result);
    } else if(this.state === "pending") {
      this.catchCallBacks.push(onRejected);
    }
    return this;
  }
};

function brewCoffe(order) {
  return new AysncTask((resolve, reject) => {
    setTimeout(() => {
      resolve(order);
    }, Math.random() * 2000);
  })
}

function prepareSnack(order) {
  return new AysncTask((resolve, reject) => {
    setTimeout(() => {
      resolve(order);
    }, Math.random() * 3000);
  })
}

function serveItem(items) {
  console.log("serving ", item.join(" and "));
  return "served :" + item.join(" and ");
}

function logServedStatus(status) {
  console.log(status);
} 

const coffeeOrder = brewCoffe('cappuccino');
const snackOrder = prepareSnack('Croissant');
coffeeOrder.then((coffee) => {
  console.log("coffee :", coffee)
  snackOrder.then((snack) => {
    console.log("snack :", snack);
  })
});
