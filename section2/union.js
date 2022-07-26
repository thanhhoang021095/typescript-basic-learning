function combine(input1, input2) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + ' ' + input2.toString();
    }
    return result;
}
var combinedAge = combine(22, 34);
var combinedNames = combine('Thanh', 'Hoang');
console.log('number', combinedAge);
console.log('string', combinedNames);
