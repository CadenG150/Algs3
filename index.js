const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const Cubid = require('cubid');

const PLLNames = ["Aa", "Ab", "E", "F", "Ga", "Gb", "Gc", "Gd", "H", "Ja", "Jb", "Na", "Nb", "Ra", "Rb", "T", "Ua", "Ub", "V", "Y", "Z"];

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "caden",
  password: "Passwordfordatabase",
  database: "algs3"
});

const yPerm1 = "F R U' R' U' R U R' F' R U R' U' R' F R F'"
const yPerm2 = "F R' F R2 U' R' U' R U R' F' R U R' U' F'"

const cube = new Cubid(yPerm1);
const newCube = cube.apply(yPerm2);

console.log(newCube.isSolved("all"));

app.locals.testVar = "x R' U R' D2 R U' R' D2 R2";

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/3x3", function(req, res) {
  res.render("3x3");
});

app.get("/PLL", function(req, res) {
  var sql = "SELECT algorithm FROM algorithms WHERE AlgorithmName = " + con.escape(PLLNames[0]);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.render("PLL", {
      algorithmTest: result,
    });
    console.log("Result: " + result);
  });
});

var http = require("http");
app.listen(process.env.PORT || 3000, () => console.log("App listening!"));