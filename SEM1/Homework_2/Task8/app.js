const fs = require('fs');
const yargs = require('yargs');
const consoleParams = yargs.argv;

const user = {
    name: consoleParams.name,
    lastName: consoleParams.lastName
};

fs.writeFileSync("./Task8/JsonParseObject.txt", JSON.stringify(user));