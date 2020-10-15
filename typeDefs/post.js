const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    allPosts(page: Int): [Post!]!
    postsByUser: [Post!]!
    singlePost(postId: String!): Post!
    totalPosts: Int!
    search(query: String): [Post]
  }
  type Post {
    _id: ID!
    content: String!
    image: Image
    postedBy: User
  }
  input PostCreateInput {
    content: String!
    image: ImageInput
  }
  input PostUpdateInput {
    _id: String!
    content: String!
    image: ImageInput
  }
  type Mutation {
    postCreate(input: PostCreateInput!): Post!
    postUpdate(input: PostUpdateInput!): Post!
    postDelete(postId: String!): Post!
  }
`;
