type CombineType = number | string;
type ConversionType = 'as-string' | 'as-number';

function combineAlias(
    input1: CombineType, 
    input2: CombineType, 
    resultConversion: ConversionType
) {
    let result;
    if (resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}


const aliasTypeAgeConversion = combineAlias(22, 34, 'as-number');
const aliasTypeNamesConversion = combineAlias(22, 34, 'as-string');

console.log('age alias', aliasTypeAgeConversion);
console.log('name alias', aliasTypeNamesConversion);