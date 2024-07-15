Array.prototype.customSlice = function(start, endIndex) {
    let result = [];
    for(let i = start; i < endIndex; i++) {
        if(this[i] !== undefined) {
            result.push(this[i]);
        } else {
            break;
        }
    }
    return result;
}

var chunk = function(arr, size) {
    if(arr.length === 0) {
        return [];
    } 
    let result = [];
    for(let i = 0; i < arr.length; i++) {
        const lastIndex = i + size;
        chunkArray.push(arr.customSlice(i, i + size));
        i = (i + size) - 1;
    }
}

const arr = [42,10,19,6,8,7,9,325,0,428,23,757];
const size = 3;

console.log(chunk(arr, size))
