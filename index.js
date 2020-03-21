const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const history = require("connect-history-api-fallback");
const app = express();

app.use(cors());
// history middleware important!
// for Single Page Application
app.use(history())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "./dist")));

var upload = multer({ dest: "uploadFile/" });
const _LOCAL = "127.0.0.1";
const _IP = _LOCAL || "192.168.1.101";
const _PORT = "7000";
const home_page = path.resolve(__dirname, "./dist/index.html");

app.get("/Blog", function(req, res) {
  res.sendFile(home_page);
});

app.post("/Blog/upload", upload.any(), function(req, res) {
  console.log(req.files[0]);
  var newFile = "./uploadFile/" + req.files[0].originalname;
  fs.readFile(req.files[0].path, function(err, data) {
    fs.writeFile(newFile, data, function(err) {
      if (err) {
        console.log("錯誤：", err);
      } else {
        let response = {
          message: "上傳成功",
          filename: req.files[0].originalname
        };
        res.json(response);
      }
    });
  });
});

app.listen(_PORT, _IP, function() {
  console.log("server start IP: " + _IP + " , PORT: " + _PORT);
});

app.get("/Blog/Register", function(req, res) {
  res.send('got Register Request')
  console.log("Request Register")
});

// 1. judge user & pwd from DB, if user/pwd is correct then create token and return.
//    1.1. mapping user & pwd from DB.
//    1.2. how to create token.
//    1.3. return token.
app.post("/Blog/Login", function(req, res) {
  console.log(req);


  // Token test
  let user = {username: req.body.username};
  let secret = "my_secret_key";
  let token = jwt.sign(user, secret, {
    'expiresIn': 60*60*2
  });
  res.send({status:200, token});
  // Token test

  console.log("Request Login");
});

app.get("/Blog/Logout", function(req, res) {
  res.send('got Logout Request')
  console.log("Request Logout")
});

app.get("/Blog/:user", function(req, res) {
  res.send('Got Blog Request')
  console.log("Request Blog")
});
