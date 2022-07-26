function combineAlias(input1, input2, resultConversion) {
    var result;
    if (resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var aliasTypeAgeConversion = combineAlias(22, 34, 'as-number');
var aliasTypeNamesConversion = combineAlias(22, 34, 'as-string');
console.log('age alias', aliasTypeAgeConversion);
console.log('name alias', aliasTypeNamesConversion);
