const fs = require("fs");
const path = require('path');

function getFileDataByName(name){
    try {
        const stats = fs.statSync(name);
        return stats;
    } catch (err) {
        console.log(err);
    }
}
function main(){
    let fileName = path.basename(__filename);
    console.log("File name: " + fileName);
    let fileStats = getFileDataByName(fileName);
    console.log("File time create: "+fileStats.birthtime);
    console.log("Last Modify time: "+fileStats.mtime);
    console.log("File size: "+fileStats.size);

}
main();
//node app.js