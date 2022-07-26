// =============== Interface =============== //
interface IPerson {
    name: string;
    action() : void;
}

// =============== Custom Type =============== //
type TPerson = {

}

class Person implements IPerson {}

