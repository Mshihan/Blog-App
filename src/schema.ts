import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    me: User
    profile(userId: String): Profile
  }

  type Mutation {
    postCreate(post: PostInput!): PostPayload
    postUpdate(postId: ID!, post: PostInput!): PostPayload
    postDelete(postId: ID!): PostPayload
    signup(user: UserInput!): UserPayload
    signin(user: SigninCredentials!): LoginPayload
    postPublish(postId: ID!): PostPayload
    postUnpublish(postId: ID!): PostPayload
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

  type LoginPayload {
    userErrors: [UserError]
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

  input SigninCredentials {
    email: String!
    password: String!
  }
`;
