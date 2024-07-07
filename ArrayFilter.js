function greaterThan10(n) {
    console.log("call :",n)
    return n > 10;
}

function firstIndex(n, i) {
    return i === 0;
}

function plusOne(n) {
    console.log("call :", n)
    return n + 1;
}


const arr = [3, 4, 11, 54, 2, 5, 99];

const thresholdObj = {
    threshold: 10,
    isGreaterThanThreshold: function(value) {
        return value > this.threshold;
    }
}

Array.prototype.customFilter = function(callback, context) {
    var arr = [];
    console.log(context, this, callback)
    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            arr.push(this[i]);
        }
    }
    return arr;
};

const result = arr.customFilter(function(element) {
    return this.isGreaterThanThreshold(element);
}, thresholdObj);

console.log(result)
