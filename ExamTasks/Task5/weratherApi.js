const axios = require("axios");
const apiUrl = " https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e&q";
function getWeather(location) {
    let url = apiUrl + "=" + location;
    axios
        .get(url)
        .then(function (response) {
            if (response) {
                for (let index = 0; index < response.data.weather.length; index++) {
                    console.log("Werather main: " + response.data.weather[index].main);
                    console.log("Weather decription: " + response.data.weather[index].description);
                }
            }
            else
                console.log("No weather for location");
        })
        .catch(function (error) {
            console.log("Error occured" + error);
        })
}
module.exports = {
    getWeather: getWeather
}