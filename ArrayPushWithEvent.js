class EventEmitter {
    constructor() {
        this.map = new Map();
    }
    
    once(eventName, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            this.unsubscribe(eventName, onceWrapper);
        }
        this.subscribe(eventName, onceWrapper);    
    }
    
    subscribe(eventName, listener) {
        if(!this.map.has(eventName)) {
            this.map.set(eventName, new Set());
        }
        this.map.get(eventName).add(listener);
    }
    
    emit(eventName, ...args) {
        if(!this.map.has(eventName)) {
            throw new Error(`not listener found for this event :${eventName}`);
            return;
        }
        
        const listeners = this.map.get(eventName);
        
        for(const listener of listeners) {
            try {
                listener.apply(this, args);
            } catch(error) {
                console.log(`Error is listener for event ${eventName}`, error);
            }
        }
    }
    
    unsubscribe(eventName, listener) {
        if(!this.map.has(eventName)) {
            throw new Error(`not listener found for this event :${eventName}`);
            return;
        }
        const listeners = this.map.get(eventName);
        listeners.delete(listener);
        if(!listeners.size) {
            this.map.delete(eventName);
        }
    }
    
    listenerCount(eventName) {
        return this.map.has(eventName) ? this.map.get(eventName).size : 0;
    }
    
    removeAllListener(eventName) {
        if(this.map.has(eventName)) {
            this.map.delet(eventName);   
        }
    }
}


class ReactiveArray {
    constructor() {
        this.array = [];
        this.eventEmitter = new EventEmitter();
    }

    push(...items) {
        for (const item of items) {
            this.array.push(item);
            this.eventEmitter.emit("item-added", item);
        }
        return this.array.length;
    }

    subscribe(eventName, listener) {
        this.eventEmitter.subscribe(eventName, listener);
    }

    unsubscribe(eventName, listener) {
        this.eventEmitter.unsubscribe(eventName, listener);
    }
    
    forEach(fn) {
        for(const value of this.array) {
            fn.apply(this, [value]);
        }
    }
}



const arr = new ReactiveArray();
arr.subscribe("item-added", (item) => {
    console.log("Item Added ", item)
})
arr.push(1);
arr.push(2);

arr.forEach((value) => console.log("value :", value));

