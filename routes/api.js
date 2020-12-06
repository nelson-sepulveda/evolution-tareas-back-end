var express = require("express");
var task = require("./task");
var autor = require("./autor");

var app = express();

app.use("/task/", task);
app.use("/autor/", autor);

module.exports = app;