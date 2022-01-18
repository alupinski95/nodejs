
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

const getWeather = (lat,lng) =>{
    return new Promise((resolve,reject)=>{
        let url = "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e" +"&lat="+lat+"&lon="+lng;
        request
            .get({ url: url, json: true }, function (error, response, body) {
                console.log(response.statusCode)
                if (error) {
                    reject("Error occured" + error);
                } else {
                if (response.statusCode === 200) {
                    resolve(body);
                }
                reject("No weather" + response);
                }
            })
    });

}

getUser(2)
    .then((user)=>{
        console.log(user);
        console.log(user.address.geo.lat,user.address.geo.lng);
        return getWeather(user.address.geo.lat,user.address.geo.lng)
    })
    .then(weather=>{
        console.log(weather);
    })
    .catch(err=>{
        console.log(err);
    });
