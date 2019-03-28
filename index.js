const express = require("express");

const app = express(); // this create the express application server
// Create Route Handler
app.get("/", (request, response) => {
  response.send({ hi: "there" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
