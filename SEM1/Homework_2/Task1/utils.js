function removeDuplicationFromArray(array){
    return new Set(array);
}
function diffBetweenArrays(array1,array2){
    return array1.filter(x => !array2.includes(x));

}
module.exports = {
    removeDuplicationFromArray: removeDuplicationFromArray,
    diff: diffBetweenArrays
}