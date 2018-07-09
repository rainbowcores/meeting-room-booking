const express = require('express');
const router = express.Router();
const user = require('../models/user.model');
const validateId = require('../validateObjectId');

router.get('/', (req, res) => {
  user.find({}, (error, users) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(users);
  });
});

router.get('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.patch('/:id', (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  return res.status(200).send('user updated');
});

router.put('/:id', (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid user id');
  }
  return res.status(200).send('user updated');
});

module.exports = router;
