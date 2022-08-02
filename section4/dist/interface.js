"use strict";
var Laptop = (function () {
    function Laptop(n, coreParam, chipBrand) {
        this._info = {
            cores: 1
        };
        this.name = n;
        this.chipBrand = chipBrand;
        this._info = {
            cores: coreParam
        };
    }
    Laptop.prototype.showInfo = function () {
        console.log(this.name + ' has ' + this._info.cores + ' cores use brand ' + this.chipBrand);
    };
    return Laptop;
}());
var acer;
acer = new Laptop('Acer Nitro 5', 4, 'Intel');
acer.showInfo();
//# sourceMappingURL=interface.js.map