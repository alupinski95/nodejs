
const params = require("./paramChech");
const githubApi = require("./githubApi");

let paramValidator = [
    { name: "username", required: true },
    { name: "displayFolowersCounter", required: false }
];



function main() {
    let validateParams = params.chceckEntryParams(process.argv, paramValidator);
    if (!validateParams) {
        console.log("Something go wrong with parameters.");
        return;
    }
    console.log(validateParams);
    githubApi.getAllData(validateParams[0], validateParams[1]);
}


main();

// node app.js pawellukaszuk false