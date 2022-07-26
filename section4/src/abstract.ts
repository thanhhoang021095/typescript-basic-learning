abstract class Car {
    constructor(protected _brand:string, protected _manuYear: number) {
    }

    abstract showBrandName(this: Car): void;
}

class SuperCar extends Car {
    constructor(_brand: string, _manuYear: number) {
        super(_brand, _manuYear)
    }

    showBrandName(): void {
        console.log('SuperCar brand name: ', this._brand);
    }
}

const ferrari = new SuperCar('ferrari', 1892);
ferrari.showBrandName();