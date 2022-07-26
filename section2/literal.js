function combineConversion(input1, input2, resultConversion) {
    var result;
    if (resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedAgeConversion = combineConversion(22, 34, 'as-number');
var combinedNamesConversion = combineConversion(22, 34, 'as-string');
console.log('age conversion', combinedAgeConversion);
console.log('name conversion', combinedNamesConversion);
