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
var Table = (function () {
    function Table(_location, _madeBy) {
        this._location = _location;
        this._madeBy = _madeBy;
    }
    Object.defineProperty(Table.prototype, "newLocation", {
        set: function (location) {
            this._location = location;
        },
        enumerable: false,
        configurable: true
    });
    return Table;
}());
var Desk = (function (_super) {
    __extends(Desk, _super);
    function Desk(_madeBy) {
        if (_madeBy === void 0) { _madeBy = ''; }
        return _super.call(this, "office", _madeBy) || this;
    }
    Desk.getInstance = function (madeBy) {
        if (Desk._deskInstance) {
            return this._deskInstance;
        }
        this._deskInstance = new Desk(madeBy);
        return this._deskInstance;
    };
    Desk.prototype.getOrigin = function () {
        console.log('Made by ' + this._madeBy);
    };
    return Desk;
}(Table));
var officeTable = Desk.getInstance('wood');
var homeTable = Desk.getInstance('');
homeTable.getOrigin();
//# sourceMappingURL=singleton.js.map