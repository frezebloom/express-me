const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const staticAsset = require("static-asset");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const database = require("./database.js");
const config = require("./config");
const routes = require("./routes");

//express
const app = express();

//database
database()
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(error => {
    console.log(`Unable to connect to database ${error}`);
  });

//session
const options = {
  connectTimeoutMS: 1000
};
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      url: config.MONGO_URL,
      mongoOptions: options
    })
  })
);

//sets and uses
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/javascripts",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

//routes
app.get("/", (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  res.render("index", {
    user: {
      id,
      login
    }
  });
});

app.use("/api/auth/", routes.auth);
app.use("/post", routes.post);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

//error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {}
  });
});

app.listen(config.PORT, () =>
  console.log(`Start server on port ${config.PORT}`)
);
