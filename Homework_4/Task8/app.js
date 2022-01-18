const axios = require('axios');
const fs = require('fs');
const util = require('util');

const getUser = (id) => {
    let url = "https://jsonplaceholder.typicode.com/users/" + id;
    return axios
            .get(url)
}

const getWeather = (lat,lng) =>{
        let url = "https://api.openweathermap.org/data/2.5/weather?appid=0ed761300a2725ca778c07831ae64d6e" +"&lat="+lat+"&lon="+lng;
        return axios
            .get(url);

}

const saveWeatherToFilePromise = util.promisify(fs.writeFile);

getUser(2)
    .then((res)=>{
        return getWeather(res.data.address.geo.lat,res.data.address.geo.lng)
    })
    .then(res=>{
        console.log(res.data);
        saveWeatherToFilePromise('weather.txt',JSON.stringify(res.data))
            .then(()=>{
                console.log("Data saved");
            })
    })
    .catch(err=>{
        console.log(err.message);
    });
