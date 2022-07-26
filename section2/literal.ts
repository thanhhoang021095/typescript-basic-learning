function combineConversion(
    input1: number | string, 
    input2: number | string, 
    resultConversion: 'as-string' | 'as-number'
) {
    let result;
    if (resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}


const combinedAgeConversion = combineConversion(22, 34, 'as-number');
const combinedNamesConversion = combineConversion(22, 34, 'as-string');

console.log('age conversion', combinedAgeConversion);
console.log('name conversion', combinedNamesConversion);
