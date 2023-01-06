"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(logString) {
    console.log('[Function -- Logger]: log out first');
    return function (constructor) {
        console.log('[Factory -- Logger]: log out after');
        console.log(logString);
        console.log('new custom class: ', constructor);
    };
}
function UseTemplate(template, hookId) {
    console.log('[Function -- UseTemplate]: log out after');
    return function (originConstructor) {
        console.log('[Factory -- UseTemplate]: log out first');
        return class extends originConstructor {
            constructor(..._args) {
                var _a;
                super();
                console.log('[Rendering Template]');
                const rootElm = document.getElementById(hookId);
                rootElm.innerHTML = template;
                const h1Elm = document.querySelector('h1');
                h1Elm.textContent += (_a = " " + this.name) !== null && _a !== void 0 ? _a : "";
            }
        };
    };
}
console.log(`================== Notes ==================`);
console.log(`Function Decorator will run from top -> bottom.`);
console.log(`But Decorator Factory will run from bottom -> top`);
console.log(`===========================================`);
console.log('\n');
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Constructor creating person object...');
    }
};
Person = __decorate([
    Logger("LOGGING - PERSON"),
    UseTemplate("<h1>Hello</h1>", "app")
], Person);
const person = new Person();
console.log('[Class Instance]: ', person);
function AutoBindInstance(_target, _methodName, descriptor) {
    const originMethod = descriptor.value;
    console.log('[test]', descriptor, originMethod);
    const adjustDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originMethod.bind(this);
        },
    };
    return adjustDescriptor;
}
class Printer {
    constructor() {
        this.message = "Trigger Button Success";
    }
    showMessage() {
        console.log('\n');
        console.log(`============== Rewrite logic with Method Decorators ===============`);
        console.log(this.message);
        console.log('=================================================');
        console.log('\n');
    }
}
__decorate([
    AutoBindInstance
], Printer.prototype, "showMessage", null);
const pt = new Printer();
const btn = document.querySelector("button");
btn.addEventListener("click", pt.showMessage);
const registerValidators = {};
function RequiredString(target, propName) {
    var _a, _b;
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registerValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registerValidators[target.constructor.name] = Object.assign(Object.assign({}, registerValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registerValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validateForm(obj) {
    const objValidatorConfig = registerValidators[obj.constructor.name];
    if (!objValidatorConfig)
        return true;
    let isValid = true;
    for (let prop in objValidatorConfig) {
        for (let validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
                default:
                    break;
            }
        }
    }
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    RequiredString
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('\n');
    console.log(`============== Validation with Decorators ===============`);
    const titleElm = document.getElementById("title");
    const priceElm = document.getElementById("price");
    const titleVal = titleElm.value;
    const priceVal = +priceElm.value;
    const course = new Course(titleVal, priceVal);
    if (!validateForm(course)) {
        alert('Invalid input');
        return;
    }
    else {
        console.log('[Course]', course);
    }
});
//# sourceMappingURL=app.js.map