const request = require("request");
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e";
function getWeather(lat,lng){
    let url = apiUrl+"&lat="+lat+"&lon="+lng;
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
module.exports = {
    getWeather:getWeather
}