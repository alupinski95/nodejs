const request = require("request");
const apiUrlAddressBase = "https://jsonplaceholder.typicode.com/users/";
const yargs = require("yargs");
const consoleParams = yargs.argv;

let url = apiUrlAddressBase +2;// consoleParams.id;

request
  .get({ url: url, json: true }, function (error, response, body) {
    if (error) {
      console.log("Error occured" + error);
    } else {
      if (response.statusCode === 404) {
        console.log("User not found.");
        return;
      }
      console.log(body.name);
      console.log("Lat " + body.address.geo.lat);
      console.log("Lng " + body.address.geo.lng);
    }
  })
  .on("error", function (error) {
    console.log("An error has occurred while get data from url: " + url);
    console.log(error.message);
  });
