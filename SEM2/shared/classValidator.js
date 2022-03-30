

'use strict';
const paramErrorMessage = "Parameters can't be empty! \n";

module.exports = class ClassValidator {
    constructor(params, validator) {
        this.valid = { isValid: true, message: "" };
        this.params = params;
        this.validator = validator;
    }
    get valid() {
        debugger
        return this.valid;
    }
    set valid(valid) {
        this.valid.isValid = valid.isValid;
        this.valid.message = valid.message;
      }
    chceckByValidator() {
        debugger
        this.validator.forEach(element => {
            if (element.required) {
                if (!this.params[element.name]) {
                    this.valid({ isValid: false, message: "Required parametr " + element.name + " is empty or null \n" });
                }
            }
        });
    }

    chceckClassParams() {
        if (!params) {
            this.valid({ isValid: false, message:paramErrorMessage });
        }
        if (!validator) {
            this.valid({ isValid: true, message:null });
        }

        chceckByValidator();
    }
}
