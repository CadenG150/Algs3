const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const Cubid = require('cubid');

/*var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "caden",
  password: "codepassword05",
  database: "eaglecare"
});*/

const yPerm1 = "F R U' R' U' R U R' F' R U R' U' R' F R F'"
const yPerm2 = "F R' F R2 U' R' U' R U R' F' R U R' U' F'"

const cube = new Cubid(yPerm1);
const newCube = cube.apply(yPerm2);

console.log(newCube.isSolved("all"));

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

app.get("/3x3", function(req, res) {
  res.render("3x3");
});

app.get("/PLL", function(req, res) {
  res.render("PLL");
});

var http = require("http");
app.listen(process.env.PORT || 3000, () => console.log("App listening!"));