"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function mergeObj(a, b) {
    return __assign(__assign({}, a), b);
}
;
var merged = mergeObj({ name: "hoang", age: 28 }, { hobbies: ['play'] });
console.log("🚀 ~ file: genericFunc.ts ~ line 9 ~ merged", merged);
function printElements(elements) {
    var textResult;
    if (elements.length === 1) {
        textResult = "Got 1 element";
    }
    else if (elements.length === 0) {
        textResult = "There is no element";
    }
    else {
        textResult = "Has " + elements.length + " elements";
    }
    return [elements, textResult];
}
;
console.log(printElements(''));
//# sourceMappingURL=genericFunc.js.map