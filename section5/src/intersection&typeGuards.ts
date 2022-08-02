type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate : Date;
}

// intersection
type Complex = string | number;
type Mixed = number | boolean;

type Combinable = Complex & Mixed;

// type guards
type UnknownEmployee = Admin | Employee;

const printInfo = (emp: UnknownEmployee) => {
    if ('privileges' in emp) {
        console.log(emp.privileges);
    } else {
        console.log(emp.startDate);
    }
}

const e1 = {
    name: 'Hoang',
    privileges: ['Trung']
}

printInfo(e1)

// Type Guard with Class
class Animal {
    constructor(private _name: string) {
    }

    doAction () {
        console.log(this._name + ' is doing something...');
    }
    
}

class Pet {
    constructor(private _name: string, private _nickName: string) {
    }

    doAction () {
        console.log(this._name + 'which nick name is' + this._nickName + ' is doing something...');
    }

    feedByOwner () {
        console.log(this._nickName + ' is feeding');
    }
}

type PetType = Animal | Pet;

const showAnimal = (a: PetType) => {
    if (a instanceof Pet) {
        a.feedByOwner()
    } else {
        a.doAction();
    }
}

const instancePet = new Pet('husky','lucky')
showAnimal(instancePet)
