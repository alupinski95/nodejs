require("dotenv").config();
const express = require("express");
const status = require("status");
const app = express();

const {
  init,
} = require("./database");

init().then(() => {
  app.get("/heartbeat", (req, res) => {
    res.send(new Date());
  });
});

app.listen(process.env.PORT, () => console.log("Server Started"));
