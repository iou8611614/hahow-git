//注意 'express' and 'body-parser'套件存放於本地端電腦。
// var _http = require('http');
// var _https = require('https');
// var _router = express.Router();
// var _util = require('util');
// var _path = require("path");
// var _cookie = require("cookie");
var history = require("connect-history-api-fallback");
// var uploadFile = require('multer');
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mysql = require("mysql");
const SERVER_IP = process.env.IP || "127.0.0.1";
const PORT = process.env.PORT || "7000";
const root = path.join(__dirname, "dist");
app.use(history());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static(root));
app.use(function(req, res, next) {
  // 解決 CORS(Cross-Origin Resource Sharing) 問題。
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// bcrypt config
const saltRounds = 10;
// SQL connect information.

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "123456",
  database: "calibration"
};

const tool_db = "calibration";
const users_table = "users";
const privacyKey = "my_top_secret_salt_key";

// Dispatch Token
function dispatchToken(userName, userEmail) {
  const payload = {
    user_name: userName,
    user_mail: userEmail
  };
  // create token
  const token = jwt.sign(
    {
      payload: payload,
      exp: Math.floor(Date.now()) / 1000 + 3600 // expire time set 3600's = 1'h
    },
    privacyKey
  );
  return token;
}

// Verify Token
function VerifyTokenIsExpire(userToken, res) {
  try {
    jwt.verify(userToken, privacyKey, function(err, decode) {
      if (err) throw err;
      console.log("Decode=> ", decode);
      res.send({
        access: true,
        errMsg: "All Good"
      });
    });
  } catch (error) {
    console.log();
    console.log(error);
    res.send({
      access: false,
      errMsg: error
    });
  }
}

// Execute SQL instruction API.
function SQL_execute(sql_Instruction, res) {
  let connection = mysql.createConnection(DB_CONFIG);
  connection.connect(function(err) {
    if (err) {
      console.error("db error reconnection: " + err.message);
    }
    connection.query(sql_Instruction, function(err, result, fields) {
      if (err) {
        console.error("db error reconnection: " + err.message);
      }
      // console.log('Field=> ', fields);
      res.send({
        access: true,
        result: result
      });
      // console.log(result);
    });
    connection.end();
  });
}

function SQL_execute_mapping_account(sql_Instruction, req, res) {
  let connection = mysql.createConnection(DB_CONFIG);
  let { username, email, password } = req.body;
  let bcryptPassword = "";
  // console.log("SQL Mapping: ", username, password);
  connection.connect(function(err) {
    if (err) {
      console.error("db error reconnection: " + err.message);
    }
    connection.query(
      "SELECT username FROM users where username =?",
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
            "SELECT password FROM users where username =?",
            username,
            function(err, result, fields) {
              bcryptPassword = result[0].password;
              bcrypt.compare(password, bcryptPassword).then(function(isMatch) {
                // console.log('Bcrypt Verify Result ==> ', isMatch);
                if (isMatch) {
                  // console.log("Match User Name's Password ==> ", result[0].password);
                  res.send({
                    loginStatus: true,
                    token: dispatchToken(username, email)
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

app.get("/", function(req, res) {
  // console.log("Got Default !!!");
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.post("/login", function(req, res) {
  console.log(
    "============================= Login Start ============================="
  );
  // console.log(req.body);
  let SQL_select = "SELECT * FROM " + users_table + ";";
  SQL_execute_mapping_account(SQL_select, req, res);
  console.log(
    "============================= Login End ============================="
  );
});

app.post("/signup", function(req, res) {
  let connection = mysql.createConnection(DB_CONFIG);
  let { id, username, email, phone, password } = req.body.formData;
  connection.connect(function(err) {
    if (err) {
      console.error("db error reconnection: " + err.message);
    }
    connection.query(
      "SELECT username FROM users WHERE username = ?",
      username,
      function(err, result) {
        if (err) {
          console.error("db error reconnection: " + err.message);
          res.send({
            loginStatus: false,
            token: null,
            signupStatus: false,
            msg: "DB Error , Please Try Again Later..."
          });
          connection.end();
        } else if (Object.keys(result).length !== 0) {
          console.error("Username already exist");
          res.send({
            loginStatus: false,
            token: null,
            signupStatus: false,
            msg: "Username already exist"
          });
          connection.end();
        } else {
          console.log(
            "============================= Signup Start ============================="
          );
          bcrypt.hash(password, saltRounds).then(function(hashPassword) {
            let formData = {
              id,
              username,
              email,
              phone,
              password: hashPassword
            };
            // console.log("Hash PWD: ", hashPassword);
            // console.log("Form Data: ", formData);
            connection.query("INSERT INTO users SET ?", formData, function(
              err,
              result
            ) {
              if (err) throw err;
            });
            res.send({
              loginStatus: true,
              token: dispatchToken(username, email),
              signupStatus: true,
              msg: "signup successful!"
            });
            connection.end();
            console.log(
              "============================= Signup End ============================="
            );
          });
        }
      }
    );
  });
});

app.get("/Year/:year", function(req, res) {
  console.log(
    "============================= Load Data Start ============================="
  );
  // console.log("Got Request => " + req._parsedOriginalUrl.path)
  let queryYear = req._parsedOriginalUrl.path.split("/")[2];
  // console.log("Query Year=> ", queryYear);
  let SQL_select =
    "SELECT * FROM " +
    tool_db +
    " WHERE YEAR(apply_date) = '" +
    queryYear +
    "';";
  SQL_execute(SQL_select, res);
  console.log(
    "============================= Load Data end ============================="
  );
});

app.post("/postForm", function(req, res) {
  console.log(
    "============================= Insert Item Start ============================="
  );
  const auth_type = req.body.headers.Authorization.split(" ")[0];
  const userToken = req.body.headers.Authorization.split(" ")[1];
  // console.log(req.body);
  console.log("Auth Type: ", auth_type);
  console.log("User Token: ", userToken);
  try {
    jwt.verify(userToken, privacyKey, function(err, decode) {
      if (err) {
        res.send({
          access: false,
          errMsg: err
        });
        throw err;
      }
      const {
        user,
        sheetNo,
        department,
        apply_date,
        tool_name,
        vendor,
        model,
        serial_number,
        owner_department,
        owner,
        id
      } = req.body.params;

      let SQL_insert = `INSERT INTO calibration VALUES
                            ('${user}','${sheetNo}','${department}','${apply_date}','${tool_name}','${vendor}','${model}','${serial_number}','${owner_department}','${owner}','${id}')`;

      SQL_execute(SQL_insert, res);
    });
  } catch (error) {
    console.log(error);
  }
  console.log(
    "============================= Insert Item End ============================="
  );
});

app.post("/delete", function(req, res) {
  console.log(
    "============================= Delete Item Start ============================="
  );
  // console.log(req.body);
  const delete_item_id = req.body.item_id;
  const auth_type = req.body.headers.Authorization.split(" ")[0];
  const userToken = req.body.headers.Authorization.split(" ")[1];
  try {
    jwt.verify(userToken, privacyKey, function(err, decode) {
      if (err) {
        // console.log('Verify Fail!!!!!!');
        res.send({
          access: false,
          errMsg: "Verify Fail"
        });
        throw err;
      }
      let SQL_delete = `DELETE FROM calibration WHERE id = '${delete_item_id}'`;
      // console.log(SQL_delete);
      SQL_execute(SQL_delete, res);
    });
  } catch (error) {
    console.log(error);
  }
  console.log(
    "============================= Delete Item End ============================="
  );
});

app.post("/verify", function(req, res) {
  console.log(
    "============================= Verify Start ============================="
  );
  const auth_type = req.body.headers.Authorization.split(" ")[0];
  const userToken = req.body.headers.Authorization.split(" ")[1];
  // console.log(userToken);
  VerifyTokenIsExpire(userToken, res);
  console.log(
    "============================= Verify End ============================="
  );
});

app.listen(PORT, SERVER_IP, function() {
  console.log("server start running at IP: " + SERVER_IP + ", PORT: " + PORT);
});
