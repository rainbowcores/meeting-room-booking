const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

// login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Invalid user credentials');
    }
  } catch (error) {
    next(error);
  }
  try {
    const validPassword = await bcrypt.compare(req.body.password, validUser.password);
    if (!validPassword) {
      return res.status(400).send('Invalid user credentials');
    }
    // create JWT and send to user
    const token = validUser.generateAuthToken();
    return res.header('x-auth-token', token).status(200).send();
  } catch (error) {
    next(error);
  }
});

/**
 * we dont have a logout route. Instead, the tokens should be deleted from the frontend
 */

module.exports = router;
