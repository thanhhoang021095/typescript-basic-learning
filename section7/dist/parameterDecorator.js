"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
console.log('\n');
console.log(`============== Accessor and Parameter Decorator ===============`);
class Student {
    constructor(name, age) {
        this._age = age;
        this._name = name;
    }
    set age(val) {
        if (val > 0) {
            this._age = val;
        }
        else {
            throw new Error('Invalid age - should be positive');
        }
    }
    get age() {
        return this._age;
    }
    set name(val) {
        if (val.length > 0) {
            this._name = val;
        }
        else {
            throw new Error('Invalid name - should not be empty');
        }
    }
    get name() {
        return this._name;
    }
    printInfo(pos) {
        console.log('Student position: ', pos);
    }
}
__decorate([
    AccessorDec
], Student.prototype, "age", null);
__decorate([
    MethodDec,
    __param(0, ParamDec)
], Student.prototype, "printInfo", null);
function MethodDec(target, name, descriptor) {
    console.log('@@ Method Decorator: ', target, name, descriptor);
}
function AccessorDec(target, name, descriptor) {
    console.log('@@ Accessor Decorator: ', target, name, descriptor);
}
function ParamDec(target, name, position) {
    console.log('@@ Param Decorator: ', target, name, position);
}
console.log('=================================================');
console.log('\n');
//# sourceMappingURL=parameterDecorator.js.map