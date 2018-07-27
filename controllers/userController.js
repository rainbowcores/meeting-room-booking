const User = require('../models/user.model');

exports.getAll = async function (req, res, next) {
  if (req.user.role !== 'admin') {
    // only admins can get all users
    return res.status(403).send({ error: 'Unauthorized resource access. User does not have valid credentials to perform that action' });
  }
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

exports.getUser = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
}

exports.createUser = async function (req, res, next) {
  try {
    const validUser = await User.findOne({ email: req.body.email });
    if (validUser) {
      return res.status(400).send({ error: 'The email is already registered by another user account' });
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
    return res.status(403).send({ error: 'Unauthorized resource access. User does not have valid credentials to perform that action' });
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
    return res.status(403).send({ error: 'Unauthorized resource access. User does not have valid credentials to perform that action' });
  }
  try {
    const updatedUser = User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
}
