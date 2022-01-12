const axios = require("axios");
const apiUrl = "http://numbersapi.com/";
function getNumberData(number, filename, callbackAfter) {
    let url = apiUrl + number;
    axios
        .get(url)
        .then(function (response) {
            if (response)
                callbackAfter(filename, response.data);
        })
        .catch(function (error) {
            console.log("Error occured" + error);
        })
}
module.exports = {
    getNumberData: getNumberData
}