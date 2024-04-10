const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3);
  }, 3000);
});

const p4 = Promise.reject("error4");
const p5 = Promise.reject("error5");

const p11 = Promise.all([p1, p2, p3])
  .then((result) => {
    console.log("p11 result :", result);
  })
  .catch((error) => {
    console.log("p11 error :", error);
  });

const p12 = Promise.all([p1, p2, p4])
  .then((result) => {
    console.log("p12 result :", result);
  })
  .catch((error) => {
    console.log("p12 error :", error);
  });

const p13 = Promise.all([p1, p5, p4])
  .then((result) => {
    console.log("p13 result :", result);
  })
  .catch((error) => {
    console.log("p13 error :", error);
  });

Promise.myAll = (promise) => {
  return new Promise((res, rej) => {
    let count = 0;
    let result = [];
    const len = promise.length;
    if (len === 0) {
      return res([]);
    }

    promise.forEach((p, i) => {
      Promise.resolve(p)
        .then((response) => {
          count += 1;
          result[i] = response;
          if (count === len) {
            res(result);
          }
        })
        .catch((error) => {
          rej(error);
        });
    });
  });
};

const p14 = Promise.myAll([p1, p2, p3])
  .then((result) => {
    console.log("p14 result :", result);
  })
  .catch((error) => {
    console.log("p14 error :", error);
  });

const p15 = Promise.myAll([p1, p2, p4])
  .then((result) => {
    console.log("p15 result :", result);
  })
  .catch((error) => {
    console.log("p15 error :", error);
  });

const p16 = Promise.myAll([p1, p5, p4])
  .then((result) => {
    console.log("p16 result :", result);
  })
  .catch((error) => {
    console.log("p16 error :", error);
  });
