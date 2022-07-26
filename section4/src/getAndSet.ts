class Animals {
    constructor(private _name: string) {
    }

    get showName() {
        return this._name
    }

    set changeName(value: string) {
        this._name = value;
    }
}

const Dog = new Animals('Dog')
console.log(Dog.showName);
Dog.changeName = 'Cat';
console.log(Dog.showName);