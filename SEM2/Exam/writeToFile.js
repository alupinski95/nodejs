
const fs = require('fs');
const readFromFile = require("./readFromFile");


async function writeDataToFile(filename, dataToAdd) {
    try {
        let dataFromFile = await readFromFile.readDataFromFile(filename);
        await fs.writeFileSync(filename, dataFromFile + '\n' + dataToAdd.toString());

    } catch (error) {
        console.log("Error while write data to file.");
        console.log(error);
    }

}

module.exports = {
    writeDataToFile: writeDataToFile
}