function add(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function multiplication(a,b){
    return a*b;
}
function division(a,b){
    return a/b;
}

module.exports = {
    add: add,
    sub: sub,
    multiplication: multiplication,
    division: division,
    piValue: Math.PI,
}