const express = require("express");
const users = require("../routes/users");
const auth = require("../routes/auth");
const bus = require("../routes/bus");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/bus", bus);
  app.use(error);
};
