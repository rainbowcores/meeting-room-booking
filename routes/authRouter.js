const express = require('express');
const router = express.Router();
const user = require('../models/user.model');
const bcrypt = require('bcrypt');

// logout user
router.post('/logout', async (req, res) => {

});

// login user
router.post('/login', async (req, res) => {
  const validUser = await user.findOne({ email: req.body.email });
  if (!validUser) {
    return res.status(400).send('Invalid user credentials');
  }
  const validPassword = await bcrypt.compare(req.body.password, validUser.password);
  if (!validPassword) {
    return res.status(400).send('Invalid user credentials');
  }
  // create JWT and send to user
  const token = validUser.generateAuthToken(); 
  return res.header('x-auth-token', token).status(200).send();
});

module.exports = router;
