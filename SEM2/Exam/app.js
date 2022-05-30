require("dotenv").config();
const express = require("express");
const status = require("status");
const path = require('path');
const app = express();
const { errorMiddleware } = require("./errorLog");
const { authMiddleware } = require("./authMiddleware");

const { init } = require("./mongoDBCliend");

init().then(() => {
	app.use(errorMiddleware);
	//app.use(authMiddleware);



	
	app.get("/heartbeat", (req, res) => {
		res.send(new Date());
	});
	app.all("*", (req, res) => {
		res.sendFile(path.join(__dirname,'/shared/404error.html'));
	});
});

app.use(express.static('public')); 
app.use('/images', express.static('images'));
// app.use(express.static(__dirname + '/images'));


app.listen(process.env.PORT, () => console.log("Server Started"));
