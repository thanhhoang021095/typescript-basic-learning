// Code goes here!
class Department {
    // private _name: string;
    protected _employees: string[] = [];

    constructor(private readonly  _id: string, private _name: string) {
        // this._name = name;
    }

    describe(this: Department) {
        console.log('Department Name: ', `(${this._id}) ${this._name}`);
    }

    addNewEmployee(emp: string) {
        this._employees.push(emp);
    }

    printEmployees() {
        console.group("Employees");
        if (this._employees.length) {
            this._employees.forEach((e: string) => {
                console.log('name: ', e);
            })
        } else {
            console.log("There is no employee");
        }
        console.groupEnd();
    }
}

class ITDepartment extends Department {
    constructor(_id: string, private _admins: string[] = []) {
        super("IT", _id)
    }

    addAdmin(ad: string) {
        this._admins.push(ad);
    }

    getAdminList() {
        console.log("Admin count: ", this._admins.length);
        return this._admins;
    }

    addNewEmployee(emp: string): void {
        if (emp !== "Hoang") {
            this._employees.push(emp);
        }
    }
}

// Accounting
const accounting = new Department('0x0', 'Accounting');;
accounting.addNewEmployee('Hoang');

accounting.printEmployees();

const IT = new ITDepartment('0x1');

// IT.describe();
IT.addAdmin('Phuong');
IT.getAdminList();

IT.printEmployees();