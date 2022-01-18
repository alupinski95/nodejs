const request = require('request')

const getUser = (id) => {
    return new Promise((resolve,reject)=>{
        let url = "https://jsonplaceholder.typicode.com/users/" + id;
        request.get({ url: url, json: true }, function (error, response, body) {
            if (error) {
                reject("Error occured" + error);
            } else {
                if (response.statusCode === 404) {
                    reject("User not found.");
                }
                else{
                    resolve(body);
                }
            }
        });
    })
}

Promise.all([getUser(2),getUser(5),getUser(7)])
.then(function (results) {
    console.log(results[0].name);
    console.log(results[1].name);
    console.log(results[2].name);
})
.catch(function (err) {
    console.log("Error while get data about user.")
    
})
.finally(()=>{
    console.log("End of promise ALL")
});