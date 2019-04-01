console.log("\x1b[36m%s\x1b[0m", process.env.Node_ENV);

if (process.env.Node_ENV === "production") {
  module.exports = require("../config/prod");
  console.log("\x1b[36m%s\x1b[0m", process.env.Node_ENV);
} else {
  module.exports = require("../config/dev");
  console.log("\x1b[36m%s\x1b[0m", process.env.Node_ENV);
}
