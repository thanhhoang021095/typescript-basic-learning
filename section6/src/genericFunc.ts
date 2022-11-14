function mergeObj<T extends object, U extends object>(a: T, b: U) {
    return {
        ...a,
        ...b
    }
};

const merged = mergeObj({ name: "hoang", age: 28 }, { hobbies: ['play'] });
console.log("🚀 ~ file: genericFunc.ts ~ line 9 ~ merged", merged)

function printElements<T extends { length: number }>(elements: T): [T, string] {
    let textResult: string;
    
    if (elements.length === 1) {
        textResult = "Got 1 element";
    } else if (elements.length === 0) {
        textResult = "There is no element";
    } else {
        textResult = "Has " + elements.length + " elements";
    }
    return [elements, textResult];
};

console.log(printElements(''));
