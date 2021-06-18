const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    email: String!
    token: String!
    createdAt: String!
  }

  type Video {
    id: ID!
    url: String!
    createdAt: String!
    email: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Query {
    getVideos: [Video]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    shareVideo(url: String!): Video!
    deleteVideo(videoId: String!): String!
  }
`;
