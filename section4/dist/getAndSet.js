"use strict";
var Animals = (function () {
    function Animals(_name) {
        this._name = _name;
    }
    Object.defineProperty(Animals.prototype, "showName", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Animals.prototype, "changeName", {
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    return Animals;
}());
var Dog = new Animals('Dog');
console.log(Dog.showName);
Dog.changeName = 'Cat';
console.log(Dog.showName);
//# sourceMappingURL=getAndSet.js.map