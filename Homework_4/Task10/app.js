const axios = require('axios');
const fs = require('fs');
const util = require('util');

const saveWeatherToFilePromise = util.promisify(fs.writeFile);

const getUser = (id) => {
    let url = `https://jsonplaceholder.typicode.com/users/${id}`;
    return axios
            .get(url)
            .then(res => res.data)
}
const getUserAlbum = (userId) => {
    let url = `https://jsonplaceholder.typicode.com/albums?userId=${userId}`;
    return axios
            .get(url)
            .then(res => res.data)
}
const getUserPhoto = (albumId) => {
    let url = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;
    return axios
            .get(url)
            .then(res => res.data)
}

getUser(2)
    .then((res)=>{
        console.log(res.name)
        return getUserAlbum(res.id)
    })
    .then(res=>{
        console.log(res);
        return getUserPhoto(res[0].id);
    })
    .then(res=>{
        console.log(res);
        saveWeatherToFilePromise('weather.txt',JSON.stringify(res))
        
    })
    .then(()=>{
        console.log("Data saved");
    })
    .catch(err=>{
        console.log(err.message);
    });
