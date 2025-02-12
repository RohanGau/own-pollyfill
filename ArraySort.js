
// partition function
function partition(arr, low, high, compareFn) {
    const pivot = arr[high];
    let i = -1;
    for(let j = 0; j < high; j++) {
        const result = compareFn(pivot, arr[j]);
        if(result > 0) {
            i += 1;
            swap(arr, i, j);
        }
    }
    i += 1;
    swap(arr, i, high);
    return i;
}

// swap function
function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}
    
Array.prototype.mySort = function(compareFn) {
    const defaultFn = (a, b) => a - b;
    compareFn = compareFn || defaultFn;
    function quickSort(arr, low, high) {
        if(low < high) {
            const pi = partition(arr, low, high, compareFn);
            quickSort(arr, low, pi-1);
            quickSort(arr, pi+1, high);
        }
    }
    
    quickSort(this, 0, this.length-1)
    return this;
}


const array = [4, 6, 2, 5, 7, 9, 3];
console.log(array.mySort((a, b) => a - b));

