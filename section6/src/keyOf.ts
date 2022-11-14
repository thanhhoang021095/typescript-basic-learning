function keyOfObject<T extends object, U extends keyof T>(object: T, key: U) {
    return 'value of object is: ' + object[key];
};

console.log(keyOfObject({ name: "Hoang" }, "name"));

