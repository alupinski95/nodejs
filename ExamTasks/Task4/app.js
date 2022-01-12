
const fs = require('fs');
const numberApi = require('./numberApi')
const filepath = "./ExamTasks/Task4/data.json";
const saveFilePath = "./ExamTasks/Task4/";


function readDataFromFile(filename) {
    try {
        const data = fs.readFileSync(
            filename,
            { encoding: 'utf8', flag: 'r' }
        );
        return data;
    } catch (error) {
        console.log("Error while reading file.");
        console.log(error);
    }

}

function saveNumberDataToFile(filename, data) {
    try {
        fs.writeFileSync(saveFilePath + filename, data.toString());
        console.log("Data from request save succesfully in file: " + filename);

    } catch (error) {
        console.log("Error while saving file.");
        console.log(error);
    }
}

function main() {
    const dataFromFile = JSON.parse(readDataFromFile(filepath));
    if (dataFromFile) {
        if (dataFromFile.number) {
            numberApi.getNumberData(dataFromFile.number, dataFromFile.filename, saveNumberDataToFile);
        } else {
            console.log("No number in file");
        }
    }
    else {
        console.log("No data in " + filepath + " file");
        return;
    }
}

main();

// node app.js