const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const history = require("connect-history-api-fallback");
const router = express.Router();
const bcrypt = require("bcrypt");
const app = express();

app.use(cors());
// history middleware important!
// for Single Page Application
app.use(history());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "./dist")));

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname+"/uploadFile/");
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.fieldname);
  }
});
var upload = multer({ storage: storage });


const _LOCAL = "127.0.0.1";
const _IP = _LOCAL || "192.168.1.101";
const _PORT = "7000";
const home_page = path.resolve(__dirname, "./dist/index.html");
const privacyKey = "my_top_secret_salt_key";
const saltRounds = 10;
// ================= Database config =================
const DB_CONFIG = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "123456",
  database: "test"
};
// ================= Database config =================

app.get("/Blog", function(req, res) {
  res.sendFile(home_page);
});

app.post("/Blog/upload", upload.any(), function(req, res) {
  console.log("Upload File");
  // res.send("done");
});

// ================================================================================================================================================
// ================================================================================================================================================
app.post("/Blog/Signup", function(req, res) {
  console.log(req.body);
  let connection = mysql.createConnection(DB_CONFIG);
  let { username, email, birthday, password } = req.body;
  connection.connect(function(err) {
    if (err) {
      console.error("db error reconnection: " + err.message);
    }

    connection.query(
      "SELECT userName FROM test WHERE userName = ?",
      username,
      function(err, result) {
        if (err) {
          console.error("DB error reconnection: ", err.message);
          res.send({
            loginStatus: false,
            token: null,
            signupStatus: false,
            msg: "DB Error , Please Try Again Later..."
          });
          connection.end();
        } else if (Object.keys(result).length != 0) {
          console.error("用戶名稱已存在!");
          res.send({
            loginStatus: false,
            token: null,
            signupStatus: false,
            msg: "用戶名稱已存在 !"
          });
          connection.end();
        } else {
          console.log(
            "============================= Signup Start ============================="
          );

          bcrypt.hash(password, saltRounds).then(function(hashPassword) {
            let formData = {
              username,
              email,
              birthday,
              password: hashPassword
            };
            console.log("Hash Password ===> ", password);
            connection.query("INSERT INTO test SET ?", formData, function(
              err,
              result
            ) {
              if (err) {
                console.error("Insert data to DB fail!");
                throw err;
              }
              res.send({
                loginStatus: true,
                token: dispatchToken(username),
                signupStatus: true,
                msg: "Signup Successful!"
              });
              connection.end();
              console.log(
                "============================= Signup End ============================="
              );
            });
          });
        }
      }
    );
  });
});
// ================================================================================================================================================
// ================================================================================================================================================

app.post("/Blog/Login", function(req, res) {
  console.log(req.body);
  SQL_execute_mapping_account(req, res);
  console.log("Request Login");
});

app.get("/Blog/Logout", function(req, res) {
  res.send("got Logout Request");
  console.log("Request Logout");
});

app.get("/Blog/:user", function(req, res) {
  res.send("Got Blog Request");
  console.log("Request Blog");
});

app.post("/Blog/getToken", function(req, res) {
  let token = createToken(req);
  res.send({ msg: "Get Token", status: 200, token });
});

app.post("/Blog/Verify", function(req, res) {
  let secretKey = "my_secret_key";
  jwt.verify(req.body.userToken, secretKey, function(err, mydata) {
    if (err) {
      res.send({ tokenVerify: false });
    } else {
      console.log(mydata);
      res.send({ tokenVerify: true });
    }
  });
});

// 1. create token.
// 2. return token.
function createToken(req) {
  let user = { username: req.body.username };
  let secret = "my_secret_key"; // salt string.
  let token = jwt.sign(user, secret, {
    // expire time 10's
    expiresIn: 10
  });
  return token;
}

app.listen(_PORT, _IP, function() {
  console.log("server start IP: " + _IP + " , PORT: " + _PORT);
});

// ===================================== function definition =====================================

function dispatchToken(userName) {
  const payload = {
    user_name: userName
    // user_mail: userEmail
  };
  // create token
  const token = jwt.sign(
    {
      payload: payload,
      exp: Math.floor(Date.now()) / 1000 + 3600 // expire time set 3600's = 1'h
    },
    privacyKey
  );
  console.log("Token is: " + token);
  return token;
}

function SQL_execute_mapping_account(req, res) {
  let connection = mysql.createConnection(DB_CONFIG);
  // let { username, email, password } = req.body;
  let { username, password } = req.body;
  let bcryptPassword = "";
  // console.log("SQL Mapping: ", username, password);
  connection.connect(function(err) {
    if (err) {
      console.error("db error reconnection: " + err.message);
    }
    connection.query(
      "SELECT userName FROM test where userName =?",
      username,
      function(err, result, fields) {
        if (err) {
          console.error("db error reconnection: " + err.message);
          res.send({
            loginStatus: false,
            errMsg: "DB Error"
          });
          connection.end();
        } else if (Object.keys(result).length === 0) {
          res.send({
            loginStatus: false,
            errMsg: "帳號不存在"
          });
          connection.end();
        } else {
          // (Terriable Bug) 未做密碼比對，導致只要帳號對，任意密碼皆可登入.
          // DB 存的密碼微加密過的密碼，須先行解密在傳進來做query.
          connection.query(
            "SELECT password FROM test where userName =?",
            username,
            function(err, result, fields) {
              bcryptPassword = result[0].password;
              console.log("user password ======> ", password);
              console.log("bcrypt password ======> ", bcryptPassword);
              bcrypt.compare(password, bcryptPassword).then(function(isMatch) {
                // console.log('Bcrypt Verify Result ==> ', isMatch);
                if (isMatch) {
                  // console.log("Match User Name's Password ==> ", result[0].password);
                  res.send({
                    loginStatus: true,
                    token: dispatchToken(username)
                    // token: dispatchToken(username, email)
                  });
                  connection.end();
                } else {
                  res.send({
                    loginStatus: false,
                    errMsg: "密碼錯誤"
                  });
                }
              });
            }
          );
        }
      }
    );
  });
}
// ===================================== function definition =====================================
