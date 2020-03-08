const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "./dist")));

var upload = multer({ dest: "uploadFile/" });
const _LOCAL = "127.0.0.1";
const _IP = _LOCAL || "192.168.1.101";
const _PORT = "7000";
const home_page = path.resolve(__dirname, "./dist/index.html");

app.get("/", function(req, res) {
  res.sendFile(home_page);
});

app.post("/upload", upload.any(), function(req, res) {
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

// app.get("/Register", function(req, res) {
//   res.sendFile(home_page);
// });

// app.get("/Login", function(req, res) {
//   res.sendFile(home_page);
// });

// app.get("/about", function(req, res) {
//   console.log("About");
//   res.send("About");
// });

// app.get("/blog", function(req, res) {
//   console.log("Blog");
//   res.send("Blog");
// });
