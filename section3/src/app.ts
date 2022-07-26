let userName: string = 'Hoang';
userName = 'strung'

console.log(userName);

class Animal {
    private _name;
    constructor(name: string) {
        this._name = name;
    }

    // get nameOfAnimal () {
    //     return this._name;
    // }
}

const dog = new Animal('huskie');
