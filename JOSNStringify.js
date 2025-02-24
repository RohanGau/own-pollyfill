function myStringify(value, map = new WeakMap()) {
  // 1️⃣ Handle primitives
  if (value === null) return "null";
  if (typeof value === "number" || typeof value === "boolean") return isFinite(value) ? String(value) : "null";
  if (typeof value === "string") return `"${value}"`;

  // 2️⃣ Handle circular references
  if (map.has(value)) return map.get(value);

  // 3️⃣ Handle special objects
  if (value instanceof Date) return `"${value.toISOString()}"`;
  if (typeof value === "bigint") throw new TypeError("Do not know how to serialize a BigInt");
  
  if (typeof value.toJSON === "function") {
    return myStringify(value.toJSON(), map);
  }

  // 4️⃣ Handle arrays
  if (Array.isArray(value)) {
    const result = [];
    map.set(value, "[Circular]");
    for (const item of value) {
      result.push(
        item === undefined || typeof item === "function" || typeof item === "symbol" 
          ? "null" 
          : myStringify(item, map)
      );
    }
    return `[${result.join(",")}]`;
  }

  // 5️⃣ Handle objects
  if (typeof value === "object") {
    map.set(value, "[Circular]");

    const entries = Object.entries(value).filter(
      ([, val]) => val !== undefined && typeof val !== "function" && typeof val !== "symbol"
    );

    const result = entries.map(([key, val]) => `"${key}":${myStringify(val, map)}`);
    return `{${result.join(",")}}`;
  }

  return undefined; // For unsupported types
}

// 🚀 Test Cases:
console.log(myStringify({ a: 1, b: undefined, c: "hello" })); // {"a":1,"c":"hello"}
console.log(myStringify([1, undefined, 3])); // [1,null,3]
console.log(myStringify({ date: new Date("2023-01-01") })); // {"date":"2023-01-01T00:00:00.000Z"}
console.log(myStringify(null)); // "null"
console.log(myStringify("hello")); // "hello"
console.log(myStringify(["a", { b: 2 }])); // ["a",{"b":2}]

try {
  const circularObj = {
    name: "John",
    age: 30,
    city: "New York",
    addr: ["chandpol", "avv"],
    myNull: null,
    nested: {
      name: "Nested",
      valid: true,
    },
  };
  circularObj.circularRef = circularObj;
  console.log(myStringify(circularObj));
} catch (e) {
  console.error("Error:", e.message);
}
