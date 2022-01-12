const axios = require("axios");
const apiUrl = "https://api.github.com/users/";
const reposEndpoint = "/repos"
const weratherApi = require("./weratherApi");

function logDataToConsole(results, varName) {
    if (results || results == 0)
        console.log("User github " + varName + ": " + results);
    else
        console.log("No data about property: " + varName);
}

function getGithubUserData(userName) {
    let url = apiUrl + userName;
    return axios
        .get(url)
        .catch(function (error) {
            console.log(error.message);
        });
}

function getGithubRepositoryData(userName) {
    let url = apiUrl + userName + reposEndpoint;
    return axios
        .get(url)
        .catch(function (error) {
            console.log(error.message);
        });
}

function getAllData(username, displayFolowersCounter = false) {
    Promise.all([getGithubUserData(username), getGithubRepositoryData(username)])
        .then(function (results) {
            if (results[0]?.data) {
                logDataToConsole(results[0].data.name, "name");
                if (displayFolowersCounter)
                    logDataToConsole(results[0].data.followers, "folowers");
            }

            if (results[1]?.data) {
                console.log("All repository names: ")
                for (let index = 0; index < results[1].data.length; index++) {
                    console.log(index + 1 + "." + results[1].data[index].name);
                }
            }
            else {
                console.log("No repositories for user " + username);
            }


            if (results[0]?.data?.location)
                weratherApi.getWeather(results[0].data.location);
            else
                console.log("No location for user: " + username);

        })
        .catch(function (err) {
            console.log("Error while get data about user.")
            console.log(err.message);
        });
}

module.exports = {
    getGithubUserData: getGithubUserData,
    getGithubRepositoryData: getGithubRepositoryData,
    getAllData: getAllData
}


