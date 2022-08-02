"use strict";
var printInfo = function (emp) {
    if ('privileges' in emp) {
        console.log(emp.privileges);
    }
    else {
        console.log(emp.startDate);
    }
};
var e1 = {
    name: 'Hoang',
    privileges: ['Trung']
};
printInfo(e1);
var Animal = (function () {
    function Animal(_name) {
        this._name = _name;
    }
    Animal.prototype.doAction = function () {
        console.log(this._name + ' is doing something...');
    };
    return Animal;
}());
var Pet = (function () {
    function Pet(_name, _nickName) {
        this._name = _name;
        this._nickName = _nickName;
    }
    Pet.prototype.doAction = function () {
        console.log(this._name + 'which nick name is' + this._nickName + ' is doing something...');
    };
    Pet.prototype.feedByOwner = function () {
        console.log(this._nickName + ' is feeding');
    };
    return Pet;
}());
var showAnimal = function (a) {
    if (a instanceof Pet) {
        a.feedByOwner();
    }
    else {
        a.doAction();
    }
};
var instancePet = new Pet('husky', 'lucky');
showAnimal(instancePet);
//# sourceMappingURL=intersection&typeGuards.js.map