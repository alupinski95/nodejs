
const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');

function chceckValidators(validator) {
    let isAnyRequired = false;
    for (let index = 0; index < validator.length; index++) {
        if (validator[index].required) {
            isAnyRequired = true;
        }
    }
    return isAnyRequired;
}


function chceckByValidator(validator, params) {
    if (!chceckValidators(validator)) {
        return true;
    }
    let isInputValid = false;
    for (let index = 0; index < params.length; index++) {
        const element = params[index];
        if (validator[index].required) {
            if (!element) {
                console.log("Required parametr " + validator[index].name + " is empty or null");
                isInputValid = false;
            }
            else {
                isInputValid = true;
            }
        } else {
            isInputValid = true;
        }
    }

    return isInputValid;
}

function checkEntryParams(args, validator) {
    if (!args) return;
    let consoleParams = yargs(hideBin(args)).argv;
    if (!validator || chceckByValidator(validator, consoleParams._)) return consoleParams._;
    else return null;
}

module.exports = {
    checkEntryParams: checkEntryParams
}