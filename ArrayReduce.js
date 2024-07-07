const array = [1, 2, 4, 5, 6, 7];
const init = 0;

function sum(accum, curr) {
    console.log("sum call :", accum, curr);
    return accum + curr;
}


Array.prototype.customReduce = function(callback, accum) {
    let accumulator = accum;
    for(let i = 0; i < this.length; i++) {
        if(accumulator) {
            accumulator = callback.call(undefined, accumulator, this[i], i, this);
        } else {
            accumulator = this[i];
        }
    }
    return accumulator;
}


// const result = array.reduce((accum, curr) => sum(accum, curr), init);
const result2 = array.customReduce((accum, curr) => sum(accum, curr), init);

// console.log("result 1:", result);
console.log("result 2:", result2);
