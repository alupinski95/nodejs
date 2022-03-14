const request = require("request");
const apiUrlAddressBase = "https://jsonplaceholder.typicode.com/users/";

const yargs = require("yargs");
const consoleParams = yargs.argv;


function main(){
    // getUserById(consoleParams.id);
    getUser(1);
}
function getUser(id){
    let url = apiUrlAddressBase + id;
    request
    .get({ url: url, json: true }, function (error, response, body) {
      if (error) {
        console.log("Error occured" + error);
        return;
      } else {
        if (response.statusCode === 404) {
          console.log("User not found.");
          return;
        }
        console.log(body.name);
        let lat =  body.address.geo.lat;
        let lng =  body.address.geo.lng;
        console.log("Lat " + body.address.geo.lat);
        console.log("Lng " + body.address.geo.lng);
        getWeather(lat,lng);
      }
    })
}


function getWeather(lat,lng){
    let url = "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&lat="+lat+"&lon="+lng;
    request
        .get({ url: url, json: true }, function (error, response, body) {
            if (error) {
                console.log("Error occured" + error);
            } else {
            if (response.statusCode === 404) {
                console.log("No weather");
                return;
            }
            console.log(body);
            }
        })
        .on("error", function (error) {
            console.log("An error has occurred while get data from url: " + url);
            console.log(error.message);
        });
}


