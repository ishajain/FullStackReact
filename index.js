const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passportLib = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");
const keys = require("./config/keys");
require("./models/user");
const passport = require("./services/passport");

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);
