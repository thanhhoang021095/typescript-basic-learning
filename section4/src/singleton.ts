abstract class Table {
    constructor(protected _location: string, protected _madeBy: string) {
    }

    set newLocation(location: string) {
        this._location = location;
    }

    abstract getOrigin(): void;
}

class Desk extends Table {
    private static _deskInstance: Desk;

    private constructor(_madeBy = '') {
        super("office", _madeBy)
    }

    static getInstance(madeBy: string):Desk {
        if (Desk._deskInstance) {
            return this._deskInstance;
        }
        this._deskInstance = new Desk(madeBy);
        return this._deskInstance;
    }

    getOrigin() {
        console.log('Made by ' + this._madeBy);
    }
}

const officeTable = Desk.getInstance('wood')
const homeTable = Desk.getInstance('')

homeTable.getOrigin();

