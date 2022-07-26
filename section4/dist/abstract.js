"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Car = (function () {
    function Car(_brand, _manuYear) {
        this._brand = _brand;
        this._manuYear = _manuYear;
    }
    return Car;
}());
var SuperCar = (function (_super) {
    __extends(SuperCar, _super);
    function SuperCar(_brand, _manuYear) {
        return _super.call(this, _brand, _manuYear) || this;
    }
    SuperCar.prototype.showBrandName = function () {
        console.log('SuperCar brand name: ', this._brand);
    };
    return SuperCar;
}(Car));
var ferrari = new SuperCar('ferrari', 1892);
ferrari.showBrandName();
//# sourceMappingURL=abstract.js.map