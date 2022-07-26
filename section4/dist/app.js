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
var Department = (function () {
    function Department(_id, _name) {
        this._id = _id;
        this._name = _name;
        this._employees = [];
    }
    Department.prototype.describe = function () {
        console.log('Department Name: ', "(".concat(this._id, ") ").concat(this._name));
    };
    Department.prototype.addNewEmployee = function (emp) {
        this._employees.push(emp);
    };
    Department.prototype.printEmployees = function () {
        console.group("Employees");
        if (this._employees.length) {
            this._employees.forEach(function (e) {
                console.log('name: ', e);
            });
        }
        else {
            console.log("There is no employee");
        }
        console.groupEnd();
    };
    return Department;
}());
var ITDepartment = (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(_id, _admins) {
        if (_admins === void 0) { _admins = []; }
        var _this = _super.call(this, "IT", _id) || this;
        _this._admins = _admins;
        return _this;
    }
    ITDepartment.prototype.addAdmin = function (ad) {
        this._admins.push(ad);
    };
    ITDepartment.prototype.getAdminList = function () {
        console.log("Admin count: ", this._admins.length);
        return this._admins;
    };
    ITDepartment.prototype.addNewEmployee = function (emp) {
        if (emp !== "Hoang") {
            this._employees.push(emp);
        }
    };
    return ITDepartment;
}(Department));
var accounting = new Department('0x0', 'Accounting');
;
accounting.addNewEmployee('Hoang');
accounting.printEmployees();
var IT = new ITDepartment('0x1');
IT.addAdmin('Phuong');
IT.getAdminList();
IT.printEmployees();
//# sourceMappingURL=app.js.map