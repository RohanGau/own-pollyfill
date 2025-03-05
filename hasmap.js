class HashMap {
    constructor(size = 16) {
        this._buckets = new Array(size);
        this._size = size;
        this._keys = [];
    }

    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash + key.charCodeAt(i)) % this._size;
        }
        return hash;
    }

    set(key, value) {
        const index = this._hash(key);
        if (!this._buckets[index]) {
            this._buckets[index] = [];
        }

        const bucket = this._buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        if(!this._keys.includes(key)){
            this._keys.push(key);
        }
    }

    get(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket) {
            return undefined;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }

        return undefined;
    }

    remove(key) {
        const index = this._hash(key);
        const bucket = this._buckets[index];
        if (!bucket) {
            return;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                const keyIndex = this._keys.indexOf(key);
                if (keyIndex !== -1) {
                    this._keys.splice(keyIndex, 1);
                }
                return;
            }
        }
    }

    keys(){
        return this._keys;
    }

    resize(){
      const oldBuckets = this._buckets;
      this._size *= 2;
      this._buckets = new Array(this._size);
      this._keys = [];

      oldBuckets.forEach(bucket => {
        if(bucket){
          bucket.forEach(pair => {
            this.set(pair[0], pair[1]);
          })
        }
      })
    }
}

const hashMap = new HashMap();
hashMap.set("name", "Rohan Kumar");
console.log("hashMap :", hashMap._buckets);
