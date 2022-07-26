function addAndPrintNumber(num1, num2, cb) {
    var addRes = num1 + num2;
    cb(addRes);
}
function printResult(num) {
    console.log(num);
}
var handleFunc;
addAndPrintNumber(12, 42, printResult);
