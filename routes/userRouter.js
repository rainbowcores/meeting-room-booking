const express = require('express');
const router = express.Router();
const user = require('../models/user.model');

router.get('/', (req, res) => {
  user.find({}, (error, users) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(users);
  });
});

router.get('/:id', (req, res) => {
  user.findById(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user);
  });
});

router.post('/', (req, res) => {
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
  user.findByIdAndRemove(req.params.id, (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(user);
  });
});

router.patch('/:id', (req, res) => {
  return res.status(200).send('user updated');
});

router.put('/:id', (req, res) => {
  return res.status(200).send('user updated');
});

const userRouter = module.exports = router;
