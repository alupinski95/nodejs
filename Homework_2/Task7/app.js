const fs = require('fs');
    
const user = {
    name: 'Jan',
    lastName: 'Nowak'
};

fs.writeFileSync("./Task7/JsonParseObject.txt", JSON.stringify(user));