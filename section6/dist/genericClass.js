"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var DataStorage = (function () {
    function DataStorage(dataType) {
        this.dataType = dataType;
        this.data = [];
    }
    DataStorage.prototype.addItem = function (item) {
        this.data.push(item);
    };
    DataStorage.prototype.removeItem = function (item) {
        var itemIdx;
        if (typeof item === "object" && item) {
            itemIdx = this.data.findIndex(function (i) {
                return JSON.stringify(i) == JSON.stringify(item);
            });
        }
        else {
            itemIdx = this.data.indexOf(item);
        }
        if (itemIdx === -1)
            return;
        this.data = __spreadArray(__spreadArray([], this.data.slice(0, itemIdx), true), this.data.slice(itemIdx + 1, this.data.length), true);
    };
    DataStorage.prototype.getItems = function () {
        console.log("data type: ".concat(this.dataType, " | storage: "), this.data);
    };
    return DataStorage;
}());
var numberStorage = new DataStorage('number');
numberStorage.addItem(3);
numberStorage.addItem(10);
numberStorage.getItems();
numberStorage.removeItem(3);
numberStorage.getItems();
var stringStorage = new DataStorage('string');
stringStorage.addItem('Tu');
stringStorage.addItem('Minh');
stringStorage.getItems();
stringStorage.removeItem('Minh');
stringStorage.getItems();
var studentStorage = new DataStorage('object');
studentStorage.addItem({ name: 'Hoang', age: 28 });
studentStorage.addItem({ name: 'Quy', age: 22 });
studentStorage.getItems();
studentStorage.removeItem({ name: 'Hoang', age: 28 });
studentStorage.getItems();
//# sourceMappingURL=genericClass.js.map