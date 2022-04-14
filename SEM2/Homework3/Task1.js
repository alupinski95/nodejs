const express = require('express');
const fs = require('fs');
const posts = require('./PostApi');
const user = require('./UserAPi');

const app = express(); 
const secretKey= "alamakota";
const users = [{
    login: 'jan',
    password: 'alamakota',
    name: 'Jan',
}, {
    login: 'adam',
    password: 'cukierki',
    name: 'Adam',   
}]

// const customMiddleware = (req, res, next) => {
//     debugger
//     // let key = req.headers?.authorization?.split(':');
//     // let authUser = null;
//     // if(key)
//     // {
//     //     users.forEach(element => { if (element.login == key[0] && element.password == key[1]) authUser = element;})
//     // }
//     // if(!authUser){
//     //     res.status(401);
//     //     res.send();
//     // }
//     // else{
//     //     console.log(`Hello ${authUser.name}`)
//     //     // console.log("Method " + req.method +
//     //     //             "Url "+req.originalUrl+ 
//     //     //             "Params " + JSON.stringify(req.params) + 
//     //     //             "Body "+ JSON.stringify(req.body))
//     //     next(); 
//     // }
//     next();

// };

// app.use(customMiddleware);
app.use(express.static('./'));

app.get('/:filename', (req, res) => {
    // res.send(`file ${req.params.filename} does not exists`);
    
    res.send(`<body><img src="${req.params.filename}"/></body>`);
});


// app.use('/posts',posts);
// app.use('/user',user);
//todo add postman tests 

app.listen(4700);
