"use strict";

require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  //db
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_AUTH_SOURCE: process.env.DB_AUTH_SOURCE,
  DB_NAME: process.env.DB_NAME,
};
