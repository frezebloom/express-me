const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");
const config = require("./config");
const database = require("./database.js");
const app = express();

//database
database()
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(error => {
    console.log(`Unable to connect to database ${error}`);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

//route
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
