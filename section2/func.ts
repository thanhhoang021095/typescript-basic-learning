function addAndPrintNumber (num1: number, num2: number, cb: (addRes: number) => void) {
    const addRes = num1 + num2;
    cb(addRes);
}

function printResult(num: number):void {
    console.log(num);
}

let handleFunc: (a:number, b:number) => number;

addAndPrintNumber(12,42, printResult)