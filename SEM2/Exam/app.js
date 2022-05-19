require("dotenv").config();
const express = require("express");
const status = require("status");
const app = express();
const { errorMiddleware } = require("./errorLog");
const { authMiddleware } = require("./authMiddleware");

const { init } = require("./mongoDBCliend");

init().then(() => {
	app.use(errorMiddleware);
	app.use(authMiddleware);



	
	app.get("/heartbeat", (req, res) => {
		res.send(new Date());
	});
	app.all("*", (req, res) => {
		res.sendFile('');
	});
});

app.listen(process.env.PORT, () => console.log("Server Started"));
