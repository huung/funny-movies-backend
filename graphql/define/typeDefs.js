const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
  }

  type Post {
    id: ID!
    url: String!
    createdAt: String!
    username: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getVideos: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
  }
`;
