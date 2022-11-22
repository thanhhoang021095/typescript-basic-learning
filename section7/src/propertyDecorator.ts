console.log('\n');
console.log(`============== Property Decorator ===============`);

class Product {
    @PropertyDecorator
    _title: string;

    constructor(title: string, private _price: number) {
        this._title = title
    }

    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    printTitle () {
        console.log('title: ', this._title);
    }

    calcPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}

function PropertyDecorator(target: any, propertyName: string) {
    console.log('Decorator target: ', target);
    console.log('Decorator propertyName: ', propertyName);
}

console.log('=================================================');
console.log('\n');
