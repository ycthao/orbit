const express = require("express");
const db = require("./models");

let PORT = process.env.PORT || 8080;
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./controllers/club_controller.js");

app.use(routes);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({}).then(function () {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
  });
});