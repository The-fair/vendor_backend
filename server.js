var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var db = require("mongoose");


var index = require("./routes/index");
var customers = require("./routes/customers");

var app = express();
var port = 3000;


app.listen(port, function(){
    console.log("Server running on port", port);
});

// views

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// body parser mw
app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/", index);

// middleware that is specific to customers Router
app.use("/api", customers);