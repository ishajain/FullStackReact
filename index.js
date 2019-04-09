const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passportLib = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
const passport = require("./services/passport");
const surveyRoutes = require("./routes/surveyRoutes");

passport();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
// Check and create the model if not found in mongoose

const app = express(); // this create the express application server

//Middleware

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passportLib.initialize());
app.use(passportLib.session());
authRoutes(app);
billingRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(express.static("client"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/dist/index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
