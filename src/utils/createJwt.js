/**
 * - This file is used to create Json Web Token for login.
 */

// jwt
const jwt = require("jsonwebtoken");

// Configs
const configs = require("../configs");

// jwt token generator
module.exports = (payload) => {
  // Create token
  const token = jwt.sign(
    { id: payload.id, role: payload.role },
    configs.jwt.secret,
    {
      expiresIn: configs.jwt.expiresIn,
    }
  );
  return token;
};
