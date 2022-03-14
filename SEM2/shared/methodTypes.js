const responseHelper = require("./responseHelper");

const methodEnum = {
    connect: "CONNECT",
    delete: "DELETE",
    get: "GET",
    head: "HEAD",
    options: "OPTIONS",
    patch: "PATCH",
    post: "POST",
    put: "PUT",
    trace: "TRACE"
}

function isMethodTypeValid(actualMethodType, allowedMethod) {
    return actualMethodType == allowedMethod;
}

function isMethodNotAllowed(actualMethodType, allowedMethod, response, callback) {
    if (!isMethodTypeValid(actualMethodType, allowedMethod)) {
        responseHelper.createResponse(
            response,
            clientErrors[405]
        );
    } else {
        callback();
    }
}

module.exports = {
    methodEnum: methodEnum,
    isMethodTypeValid: isMethodTypeValid,
    isMethodNotAllowed: isMethodNotAllowed
}