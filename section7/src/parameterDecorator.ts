console.log('\n');
console.log(`============== Accessor and Parameter Decorator ===============`);

class Student {
    _name: string;
    _age: number;

    @AccessorDec
    set age(val: number) {
        if (val > 0) {
            this._age = val;
        } else {
            throw new Error('Invalid age - should be positive');
        }
    }

    get age() {
        return this._age;
    }

    set name(val: string) {
        if (val.length > 0) {
            this._name = val;
        } else {
            throw new Error('Invalid name - should not be empty');
        }
    }

    get name() {
        return this._name;
    }

    constructor(name: string, age: number) {
        this._age = age;
        this._name = name;
    }

    @MethodDec
    printInfo(@ParamDec pos: number) {
        console.log('Student position: ', pos);
    }
}

// Function Decorators
function MethodDec(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('@@ Method Decorator: ', target, name, descriptor);
}

function AccessorDec(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('@@ Accessor Decorator: ', target, name, descriptor);
}

function ParamDec(target: any, name: string | Symbol, position: number) {
    console.log('@@ Param Decorator: ', target, name, position);
}

console.log('=================================================');
console.log('\n');
