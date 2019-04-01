const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passportLib = require("passport");

const authRoutes = require("./routes/authRoutes");
const keys = require("./config/keys");
require("./models/user");
const passport = require("./services/passport");

passport();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
// Check and create the model if not found in mongoose

const app = express(); // this create the express application server
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passportLib.initialize());
app.use(passportLib.session());
authRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
