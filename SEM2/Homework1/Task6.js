const http = require("http");
var url = require('url');

const app = http.createServer((request, response) => {
    // response.writeHead(201,{"Content-type":"d"})
    var params = url.parse(request.url, true).query;
    let resultA = Number(params['a']);
    let resultB = Number(params['b']);
    let res = 0;
    let code = 200;
    let message = "";
    
    if (request.url.includes("/mnozenie")) {
        res = resultA * resultB;
    }
    else if (request.url.includes("/dzielenie")) {
        res = resultA / resultB;
    }
    else if (request.url.includes("/dodawanie")) {
        res = resultA + resultB;
    }
    else if (request.url.includes("/odejmowanie")) {
        res = resultA - resultB;
    }
    if (!res) {
        code = 400;
        message = "Bad request";
    }
    else {
        message = "Result of operation:" + res.toString();
    }

    response.writeHead(code, { "Content-type": "test/plain" });
    response.write(message);

    response.end();
});

app.listen(4600);
