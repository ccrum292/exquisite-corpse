const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;
const db = require("./models");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exquisite-corpse", {
  useNewUrlParser: true,
  useFindAndModify: false
});

require("./controllers/html-routes")(app);
require("./controllers/api-routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
