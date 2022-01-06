const fs = require('fs');
const yargs = require('yargs');
const consoleParams = yargs.argv;

const user = {
    name: consoleParams.name,
    lastName: consoleParams.lastName
};
function onErrorRead(error){
    if (error)
        {
            console.log("Error while file read\n");
            console.log(error); 
        }
        else {
            console.log("File read successfully\n");
        }
}
const a =fs.readFile(
    "./Homework_3/Task3/user.json",
    {encoding:'utf8', flag:'r'},
    (error) => onErrorRead(error)
);
if(a)
{
    let obj = JSON.parse(a);
    console.log("Data from old file Name: "+ obj.name  )
}
else{
    console.log("No data from old file " )
}

function onWriteError(err) {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully\n");
    
        console.log(fs.readFileSync("user.json","utf8"));
    }
}

fs.writeFile("./Homework_3/Task3/user.json",
    JSON.stringify(user),
    (error) => onWriteError(error)
);