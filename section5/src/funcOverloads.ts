type CombineType = number | string;

function addFunc(n1: number, n2: number): number;
function addFunc(n1: string, n2: string): string;
function addFunc(n1: CombineType, n2: CombineType) {
    if (typeof n1 === 'string' || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
};

const res1 = addFunc('Nam', "Trung");
const res2 = addFunc(2, 6);