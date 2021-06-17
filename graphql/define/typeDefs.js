const { gql } = require("graphql-tag");

module.exports = gql`
  type Post {
    id: ID!
    url: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getVideos: [Post]
  }
`;
