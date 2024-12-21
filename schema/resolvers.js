import {
  deletePost,
  getPost,
  getPosts,
  savePost,
  updatePost,
} from "../lib/db.js";

const resolvers = {
  Query: {
    posts() {
      const posts = getPosts();

      return posts;
    },
    post(_, args) {
      const postId = args.id;

      const post = getPost(postId);

      return post;
    },
  },
  Mutation: {
    createPost(_, args) {
      const postData = args.input;

      return savePost(postData.title, postData.content);
    },
    deletePost(_, args) {
      const postId = args.id;

      return deletePost(postId);
    },
    updatePost(_, args) {
      const postId = args.id;
      const postData = args.input;

      return updatePost(postId, postData);
    },
  },
};

export default resolvers;
