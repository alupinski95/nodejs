const express = require('express');

const posts = require('./PostApi');
const user = require('./UserAPi');

const app = express(); 

app.use('/posts',posts);
app.use('/user',user);
//todo add postman tests 

app.listen(4700);
