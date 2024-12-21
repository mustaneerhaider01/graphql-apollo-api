const typeDefs = `#graphql
  type Post {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
  }

  input UpdatePostInput {
    title: String!
    content: String!
  }

  type Query {
    posts: [Post!]!
    post(id: Int!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
    deletePost(id: Int!): Boolean!
    updatePost(id: Int!, input: UpdatePostInput!): Post!
  }
`;

export default typeDefs;
