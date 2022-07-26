"use strict";
var Person = (function () {
    function Person() {
    }
    Person.setName = function (name) {
        Person._name = name;
    };
    Person._type = 'human';
    return Person;
}());
//# sourceMappingURL=staticMethod.js.map