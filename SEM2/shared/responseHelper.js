const headers = {
    contentTypeJson: { "Content-type": "application/json" },
    contentTypeText: { "Content-type": "test/plain" }
}

const informationCodes = {
    100: {

    },
    101: {

    },
    102: {

    },
    103: {

    },
}

const successCodes = {
    200: {
        code: 200,
        headers: headers.contentTypeJson,
        message: "Request succes."
    },
    201: {
        code: 201,
        headers: headers.contentTypeJson,
        message: "Request has been fulfilled.Resource created."
    },
    202: {

    },
    203: {

    },
}

const clientErrors = {
    400: {
        code: 400,
        headers: headers.contentTypeJson,
        message: "Bad Request"
    },
    404: {
        code: 404,
        headers: headers.contentTypeJson,
        message: "Not Found"
    },
    405: {
        code: 405,
        headers: headers.contentTypeJson,
        message: "Method Not Allowed"
    }
}


function createResponse(res, statusObject, body) {
    res.writeHead(statusObject.code, statusObject.headers);
    res.write(!statusObject.message ? body : body + "\n" + statusObject.message);
    res.end();
}

module.exports = {
    createResponse: createResponse,
    informationCodes: informationCodes,
    successCodes: successCodes,
    clientErrors: clientErrors
}