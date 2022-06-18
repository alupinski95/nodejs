require("dotenv").config();
const express = require("express");
const status = require("status");
const path = require('path');
const app = express();
const { debugMiddleware, checkEntryParams } = require("./errorLog");

const AdRoutes = require('./AdvertiseController/AdController');
const { init } = require("./mongoDBCliend");

checkEntryParams();

init().then(() => {
    app.use(debugMiddleware);
    app.get("/heartbeat", (req, res) => {
        res.send(new Date());
    });


    app.use('/Advertise', AdRoutes);
    app.all("*", (req, res) => {
        res.sendFile(path.join(__dirname, '/shared/404error.html'));
    });

});

app.use(express.static('public'));
app.use('/images', express.static('images'));


app.listen(process.env.PORT, () => console.log("Server Started"));
