const http = require("http");
var url = require('url');

const app = http.createServer((request, response) => {
    var params = url.parse(request.url, true).query;

    response.writeHead(200, { "Content-type": "application/json" });
    response.write(JSON.stringify(params));

    response.end();
});

app.listen(4600);
