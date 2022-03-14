const paramErrorMessage = "Parameters can't be empty! \n";
const paramRequiredMessage = `Required parametr ${paramName} \n`;

class ClassValidator {
    constructor(params, validator) {
        this.valid = { isValid: true, message: "" };
        this.params = params;
        this.validator = validator;
    }
    get valid() {
        return this.valid;
    }
    chceckByValidator() {
        this.validator.forEach(element => {
            if (element.required) {
                if (!this.params[element.name]) {
                    this.valid.message = "Required parametr " + element.name + " is empty or null \n";
                    this.valid.isValid = false;
                }
            }
        });
    }

    chceckClassParams() {
        if (!params) {
            this.valid.message = paramErrorMessage;
        }
        if (!validator) {
            this.valid.isValid = true;
            this.valid.message = null;
        }

        chceckByValidator();
    }
}
