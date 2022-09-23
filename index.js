const path = require("path");
const express = require("express");
const app = express();
const { PORT } = require("./utils/env");

app.use(express.static(path.join(__dirname, "uploads")));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = server;
