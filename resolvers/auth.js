const shortid = require('shortid');
const { DateTimeResolver } = require('graphql-scalars');
const { authCheck } = require('../helpers/auth');
const User = require('../models/User');

const userCreate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const user = await User.findOne({ email: currentUser.email });

  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate(),
      }).save();
};

const userUpdate = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const updatedUser = await User.findOneAndUpdate(
    { email: currentUser.email },
    { ...args.input },
    { new: true }
  ).exec();

  return updatedUser;
};

const profile = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  return await User.findOne({ email: currentUser.email }).exec();
};

module.exports = {
  Query: {
    profile,
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
};
