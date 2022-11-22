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
                const rootElm = document.getElementById(hookId);
                const newPerson = new originConstructor();
                rootElm.innerHTML = template;
                const h1Elm = document.querySelector('h1');
                h1Elm.textContent += (_a = " " + (newPerson === null || newPerson === void 0 ? void 0 : newPerson.name)) !== null && _a !== void 0 ? _a : "";
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
        console.log('Creating person object...');
    }
};
Person = __decorate([
    Logger("LOGGING - PERSON"),
    UseTemplate("<h1>Hello</h1>", "app")
], Person);
const person = new Person();
console.log(person);
//# sourceMappingURL=app.js.map