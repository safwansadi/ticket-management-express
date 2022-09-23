const { JWT_PRIVATE_KEY } = require("../utils/env");

module.exports = function () {
  if (!JWT_PRIVATE_KEY) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
