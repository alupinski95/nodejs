// Dodanie do naszej aplikacji z zadania 7,8 przed nadpisaniem nowymi wartościami, wczytanie już wcześniej 
// zapisanego obiektu. W konsoli wypiszmy jedynie imię wczytanego użytkownika.

const fs = require('fs');
const yargs = require('yargs');
const consoleParams = yargs.argv;

const user = {
    name: consoleParams.name,
    lastName: consoleParams.lastName
};
const a =fs.readFileSync("./Task9/JsonParseObject.txt",{encoding:'utf8', flag:'r'});
if(a)
{
    let obj = JSON.parse(a);
    console.log("Data from old file Name: "+ obj.name  )
}
else{
    console.log("No data from old file " )
}
fs.writeFileSync("./Task9/JsonParseObject.txt", JSON.stringify(user));