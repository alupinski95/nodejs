
const fs = require('fs');

function writeDataToFile(filename, dataToAdd) {
    try {
        fs.writeFileSync(filename, dataToAdd.toString());
        console.log("Record add successfully to list.");

    } catch (error) {
        console.log("Error while write data to file.");
        console.log(error);
    }

}

module.exports = {
    writeDataToFile: writeDataToFile
}