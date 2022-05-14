"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    posts: [Post!]!
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload
    postUpdate(postId: ID!, post: PostInput!): PostPayload
    postDelete(postId: ID!): PostPayload
    signUp(user: UserInput!): UserPayload
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile
    password: String
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserError {
    message: String!
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type UserPayload {
    userErrors: [UserError]
    user: User
    token: String
  }

  input PostInput {
    title: String
    content: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    bio: String!
  }
`;
