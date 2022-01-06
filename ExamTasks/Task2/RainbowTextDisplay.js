const yargs = require("yargs");
const { hideBin } = require('yargs/helpers');
const colors = require("colors");
const consoleParams =yargs(hideBin(process.argv)).argv;


function main() {
    if(!consoleParams){
        console.log("No parameters");
        return;
    }
    else{
        if(Object.keys(consoleParams._).length>1)
            console.log("To much parameters, only first parameter will be used.");
        console.log(consoleParams._[0].toString().rainbow);
    }
}

main();
//node RainbowTextDisplay.js "dodaj"