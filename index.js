const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require("express-session");

/*var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "caden",
  password: "codepassword05",
  database: "eaglecare"
});*/

app.use(
  session({
    secret: "secretsession",
    resave: false,
    saveUninitialized: true
  })
);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", function(req, res) {
  res.render("index");
});

var http = require("http");
app.listen(process.env.PORT || 3000, () => console.log("App listening!"));