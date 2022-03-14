const http = require("http");
const url = require('url');
const methodTypes = require("../../shared/methodTypes");
const responseHelper = require("../../shared/responseHelper");
const port = 4600;
var params = null;
let userList = [];

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
    let validator = new ClassValidator(params, validatorUser);
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
        //response added succes
    }
}

function deleteUser() {

}

function showUser() {

}



const app = http.createServer(requestListener);

app.listen(port);

let userValidatorObject = [
    { name: "name", required: true },
    { name: "username", required: true },
    { name: "id", required: true },
    { name: "email", required: true }
];