const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const { SECRET_KEY } = require("../config");

module.exports = (context) => {
  try {
    const authHeader = context.req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split("Bearer ")[1];
      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          return user;
        } catch (err) {
          throw new AuthenticationError("Invalid auth token");
        }
      }
      throw new AuthenticationError("Invalid auth token");
    }
    throw new AuthenticationError("Invalid auth token");
  } catch (err) {
    throw new AuthenticationError("Invalid auth token");
  }
};
