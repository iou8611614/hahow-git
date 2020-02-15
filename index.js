const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
app.use(express.static(path.resolve(__dirname, "./dist")));
app.get("/", function(req, res) {
  const html = fs.readFileSync(
    path.resolve(__dirname, "./dist/index.html"),
    "utf-8"
  );
  res.send(html);
});

app.get("/about", function(req, res) {
  console.log("get about route");
  res.send("sever got about route");
});

app.get("/blog", function(req, res) {
  console.log("get blog route");
  res.send("sever got blog route");
});

app.listen("3000", function() {
  console.log("server start");
});
