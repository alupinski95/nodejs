const request = require("request");
const apiUrl = "http://numbersapi.com/";
function getNumberData(number, filename, callbackAfter) {
    let url = apiUrl + number;
    request
        .get(
            { url: url, json: true },
            function (error, response, body) {
                if (error) {
                    console.log("Error occured" + error);
                } else {
                    if (response.statusCode === 404) {
                        console.log("No info about number.");
                        return;
                    }
                    if (body)
                        callbackAfter(filename, body);
                }
            })
        .on("error", function (error) {
            console.log("An error has occurred while get data from url: " + url);
            console.log(error.message);
        });
}
module.exports = {
    getNumberData: getNumberData
}