
const params = require("../Task5/paramChech");
const writeToFile = require("./writeToFile");
const readFromFile = require("./readFromFile");
const fileName = "todoList.txt"


let paramValidator = [
    { name: "operationName", required: true },
    { name: "todoElement", required: false }
];


function main() {   
    let validateParams = params.checkEntryParams(process.argv, paramValidator);
    if (!validateParams) {
        console.log("Something go wrong with parameters.");
        return;
    }
    switch (validateParams[0]) {
        case "dodaj":
            let dataFromFile = readFromFile.readDataFromFile(fileName);
            writeToFile.writeDataToFile(fileName, dataFromFile + "\n" + validateParams[1]);
            break;

        case "lista":
            let dataFile = readFromFile.readDataFromFile(fileName);
            console.log("Your ToDo List:");
            console.log(dataFile);
            break;
        case "wyczysc":
            writeToFile.writeDataToFile(fileName, "");
            break;
        default:
            break;
    }

}

main();

// node app.js dodaj  "napisac program na zaliczenie z NodeJS"

// node app.js lista

// node app.js wyczysc