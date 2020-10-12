const shortid = require('shortid');
const { authCheck } = require('../helpers/auth');
const User = require('../models/User');

const me = async (parent, args, { req }) => {
  await authCheck(req);
  return 'Nick';
};

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const user = await User.findOne({ email: currentUser.email });

  return user 
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate()
      }).save();
};

module.exports = {
  Query: {
    me
  },
  Mutation: {
    userCreate
  }
};