const { posts } = require('../temp.data');
const { authCheck } = require('../helpers/auth');

// queries
const totalPosts = () => posts.length;

const allPosts = async (parent, args, { req }) => {
  return await posts;
};

// mutations
const newPost = (parent, { input: { title, description } }) => {
  const post = {
    id: posts.length + 1,
    title,
    description
  };

  posts.push(post);

  return post;
};

module.exports = {
  Query: {
    totalPosts,
    allPosts
  },
  Mutation: {
    newPost
  }
};
