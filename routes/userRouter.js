const express = require('express');
const router = express.Router();
const user = require('../models/user.model');
const validateId = require('../validateObjectId');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  user.find({}, (error, users) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(users);
  });
});

router.get('/:id', authMiddleware, (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  user.findById(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user);
  });
});

router.post('/', async (req, res) => {
  const validUser = await user.findOne({ email: req.body.email });
  if (validUser) {
    return res.status(400).send('The email is already registered by another user account');
  }
  new user({
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role
  }).save(((error, user) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(user);
  }));
});

router.delete('/:id', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  user.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user);
  });
});

router.patch('/:id', authMiddleware, (req, res) => {
  // make sure user is updating their own account details
  if (req.user._id !== req.params.id) {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  return res.status(200).send('user updated');
});

router.put('/:id', authMiddleware, (req, res) => {
  // make sure user is updating their own account details
  if (req.user._id !== req.params.id) {
    // only admins can get all users
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  return res.status(200).send('user updated');
});

module.exports = router;
