"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
console.log('\n');
console.log(`============== Property Decorator ===============`);
class Product {
    constructor(title, _price) {
        this._price = _price;
        this._title = title;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('Invalid price - should be positive!');
        }
    }
    printTitle() {
        console.log('title: ', this._title);
    }
    calcPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    PropertyDecorator
], Product.prototype, "_title", void 0);
function PropertyDecorator(target, propertyName) {
    console.log('Decorator target: ', target);
    console.log('Decorator propertyName: ', propertyName);
}
console.log('=================================================');
console.log('\n');
//# sourceMappingURL=propertyDecorator.js.map