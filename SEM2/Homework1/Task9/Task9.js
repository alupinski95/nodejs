const http = require("http");
const url = require('url');
const methodTypes = require("../../shared/methodTypes");
const responseHelper = require("../../shared/responseHelper");
const port = 4600;
var params = null;
let userList = [];


const userValidator = [
    { name: "name", required: true },
    { name: "username", required: true },
    { name: "id", required: true },
    { name: "email", required: true }
];

const idValidator = [
    { name: "id", required: true }
];

const routes = {
    add: "/add",
    show: "/show",
    delete: "/delete"
}


const requestListener = function (req, res) {
    params = url.parse(req.url, true).query;
    var path = url.parse(req.url, true).pathname;
    var reqType = req.method;

    switch (path) {
        case routes.add:
            methodTypes.isMethodNotAllowed(
                reqType,
                methodTypes.methodEnum.post,
                response,
                addUser(res));
            break;
        case routes.show:
            methodTypes.isMethodNotAllowed(
                reqType,
                methodTypes.methodEnum.get,
                response,
                showUser);
            break;
        case routes.delete:
            methodTypes.isMethodNotAllowed(
                reqType,
                methodTypes.methodEnum.delete,
                response,
                deleteUser);
            break;
        default:
            responseHelper.createResponse(
                res,
                clientErrors[404]
            );

    }
}

function addUser(res) {
    let validator = new ClassValidator(params, userValidator);
    validator.chceckClassParams();
    let validRes = validator.valid;
    if (!validRes.isValid) {
        responseHelper.createResponse(
            res,
            clientErrors[400],
            validRes.message
        );
    }
    else {
        let index = userList.length + 1;
        let newUser = new User(index, params.name, params.username, params.email);
        userList.push(newUser);
        responseHelper.createResponse(
            res,
            clientErrors[201]
        );
    }
}

function deleteUser(res) {
    let validator = new ClassValidator(params, idValidator);
    validator.chceckClassParams();
    let validRes = validator.valid;
    if (!validRes.isValid) {
        responseHelper.createResponse(
            res,
            clientErrors[400],
            validRes.message
        );
    }
    else {
        userList.splice(params.id, 1);
        responseHelper.createResponse(
            res,
            clientErrors[200]
        );
    }
}

function showUser() {
    let data = null;
    if (!params.id) {
        data = userList[params.id];
    } else {
        data = userList;
    }
    responseHelper.createResponse(
        res,
        clientErrors[200],
        JSON.parse(data)
    );
}



const app = http.createServer(requestListener);

app.listen(port);

//bilety
//node