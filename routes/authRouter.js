const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// login user
router.post('/login', async (req, res, next) => {
  let user;
  if(!req.body.email || !req.body.password) {
    return res.status(400
    ).send('Bad request. You need to provide authentication credentials');
  }
  try {
    user = await User.findOne({ email: req.body.email }); // var is hoisted
    if (!user) {
      return res.status(401).send('Invalid user credentials');
    }
  } catch (error) {
    return next(error);
  }
  try {
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid user credentials');
    }
    // create JWT and send to user
    const token = user.generateAuthToken();
    return res.header('x-auth-token', token).status(200).send('what');
  } catch (error) {
    return next(error);
  }
});

/**
 * we dont have a logout route. Instead, the tokens should be deleted from the frontend
 */

module.exports = router;
