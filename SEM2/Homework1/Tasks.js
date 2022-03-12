const http = require("http");
var url = require('url');

const app = http.createServer((request, response) => {
  // response.writeHead(201,{"Content-type":"d"})
  var params = url.parse(request.url, true).query;
  
  if (request.url === "/comments") {
    response.writeHead(200, { "Content-type": "test/plain" });
    response.write("Hello from comments path " + request.method);
  }
  if (request.url === "/users") {
    response.writeHead(200, { "Content-type": "test/plain" });
    response.write("Hello from Users path " + request.method);
  } else {
    response.writeHead(200, { "Content-type": "test/plain" });
    //let stringHello = (params.name? "Hello "+params.name: "Hello world")

    let resultA =params['a'];
    let resultB = params['b'];
    let res =resultA*resultB;
    response.write(res.toString() );
    // response.write("Hello world " + request.method + "   " + JSON.stringify( params));
  }

  response.end();
});

app.listen(4700);
