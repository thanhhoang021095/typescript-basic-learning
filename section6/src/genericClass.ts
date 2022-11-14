class DataStorage<T> {
    constructor(private dataType: string) {
    }
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        let itemIdx: number;
        if (typeof item === "object" && item) {
            itemIdx = this.data.findIndex(i => {
                return JSON.stringify(i) == JSON.stringify(item);
            });
        } else {
            itemIdx = this.data.indexOf(item);
        }
        if (itemIdx === -1) return;
        this.data = [...this.data.slice(0, itemIdx), ...this.data.slice(itemIdx + 1, this.data.length)];
    }

    getItems(): void {
        console.log(`data type: ${this.dataType} | storage: `, this.data);
    }
}

// Number Type
const numberStorage = new DataStorage<number>('number');
numberStorage.addItem(3);
numberStorage.addItem(10);
numberStorage.getItems();
numberStorage.removeItem(3);
numberStorage.getItems();

// String Type
const stringStorage = new DataStorage<string>('string');
stringStorage.addItem('Tu');
stringStorage.addItem('Minh');
stringStorage.getItems();
stringStorage.removeItem('Minh');
stringStorage.getItems();

// Object Type
interface Student {
    name: string;
    age: number;
}
const studentStorage = new DataStorage<Student>('object');
studentStorage.addItem({ name: 'Hoang', age: 28 });
studentStorage.addItem({ name: 'Quy', age: 22 });
studentStorage.getItems();
studentStorage.removeItem({ name: 'Hoang', age: 28 });
studentStorage.getItems();