class Person {
    static readonly _type = 'human';
    static _name: string;

    static setName(name: string) {
        Person._name = name
    }
}
