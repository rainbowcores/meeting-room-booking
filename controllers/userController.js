const User = require('../models/user.model');
const validateId = require('../validateObjectId');

exports.getAll = async function (req, res, next) {
  if (req.user.role !== 'admin') {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

exports.getUser = async function (req, res, next) {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

exports.createUser = async function (req, res, next) {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (validUser) {
      return res.status(400).send('The email is already registered by another user account');
    }
  } catch (error) {
    next(error);
  }
  try {
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      role: req.body.role
    }).save();
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

exports.deleteUser = async function (req, res, next) {
  if (req.user.role !== 'admin') {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

exports.updateUser = async function (req, res, next) {
  // make sure user is updating their own account details
  if (req.user._id !== req.params.id) {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  try {
    const updatedUser = User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
}
