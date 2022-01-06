const lodash = require("../node_modules/lodash");
function removeDuplicationFromArray(array){
    return lodash.uniq(array)
}
function diffBetweenArrays(array1,array2){
    return lodash.difference(array1, array2);

}
module.exports = {
    removeDuplicationFromArray: removeDuplicationFromArray,
    diff: diffBetweenArrays
}