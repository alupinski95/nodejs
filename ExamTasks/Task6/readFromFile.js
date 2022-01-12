
const fs = require('fs');

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

module.exports = {
    readDataFromFile: readDataFromFile
}