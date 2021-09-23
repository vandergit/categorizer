/* Name     : ./server.js
 * Author(s): Polina, Jose, Jairo
 * Date     : Sep 24, 2021
 * Purpose  : Requiere modules (Common JS) needed by the app
 *            Set web server configuration parameters (i.e., port, enviroment type)
 *            Create the Pool for database connections
 *            Define and mount Routes for each Resource
 * Reference: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 * Start    : 1. Run ./bin/resetdb.js
 *            2. Run npm i
 *            3. Add API keys to .env file (API_G=your key for google api
 *                                          API_W=your key for wolframalpha api
 *                                          API_O=your key for obdb api)
 *            4. npm run local
 *            5. localhost:8080 (browser)
 */

// Load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes,
//         and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
//const usersRoutes = require("./routes/users");
const cookiesRoutes = require("./routes/cookies");
const categoriesRoutes = require("./routes/categories");
//const activitiesRoutes = require("./routes/activities");

// Mount all resource routes
//app.use("/api/users", usersRoutes(db));
app.use("/login", cookiesRoutes(db));
app.use("/categories", categoriesRoutes(db));
//app.use("/activities", activitiesRoutes(db));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/settings", (req, res) => {
//   res.render("settings");
// });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
