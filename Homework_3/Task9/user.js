const request = require("request");
const weather =require("./weather");
const apiUrlAddressBase = "https://jsonplaceholder.typicode.com/users/";
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
        else{
            let lat =  body.address.geo.lat;
            let lng =  body.address.geo.lng;
            console.log(body.name);
            console.log("Lat " + body.address.geo.lat);
            console.log("Lng " + body.address.geo.lng);
            weather.getWeather(lat,lng);}
      }
    })
}

module.exports = {
    getUser:getUser
}