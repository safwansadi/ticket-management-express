const mongoose = require("mongoose");

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_AUTH_SOURCE,
  DB_NAME,
} = require("../utils/env");

module.exports = function () {
  const db = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  mongoose
    .connect(db, {
      user: DB_USERNAME,
      pass: DB_PASSWORD,
      authSource: DB_AUTH_SOURCE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`connected to mongoDB`))
    .catch((err) => console.log(err));
};
