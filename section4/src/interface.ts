// =============== Interface =============== //
interface IName  {
    readonly name: string;
}

interface ILaptop extends IName {
    showInfo() : void;
}

// =============== Custom Type =============== //
type TLaptop = IName & {
    showInfo() : void;
}

type SubTLaptop = {
    chipBrand: string;
}

// =============== Class Implement =============== //
class Laptop implements ILaptop, SubTLaptop {
    name: string;
    chipBrand: string;

    private _info: { cores: number } = {
        cores: 1
    };

    constructor(n: string, coreParam: number, chipBrand: string) {
        this.name = n;
        this.chipBrand = chipBrand;
        this._info = {
            cores: coreParam
        }
    }

    showInfo() {
        console.log(this.name + ' has ' + this._info.cores + ' cores use brand ' + this.chipBrand);
    }
}

// =============== Test & Result =============== //
let acer: ILaptop;
acer = new Laptop('Acer Nitro 5', 4, 'Intel');
acer.showInfo();