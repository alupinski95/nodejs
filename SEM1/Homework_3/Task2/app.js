
const fs = require('fs');
const yargs = require('yargs');
const consoleParams = yargs.argv;

const user = {
    name: consoleParams.name,
    lastName: consoleParams.lastName
};

fs.writeFile("./Homework_3/Task2/user.json",
    JSON.stringify(user),
    (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        
            console.log(fs.readFileSync("user.json","utf8"));
        }
  });