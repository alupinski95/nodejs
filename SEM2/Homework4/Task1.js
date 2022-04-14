require('dotenv').config();
const express = require('express');



const port = process.env.port;
console.log(process.env.port)
const posts = require('./PostApi');

const app = express(); 

app.use('/posts',posts);

app.listen(port);
