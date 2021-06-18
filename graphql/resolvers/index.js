const videosResolvers = require("./videos");
const usersResolvers = require("./users");

module.exports = {
  Query: {
    ...videosResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
