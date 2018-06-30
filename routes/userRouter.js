const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.status(200).send('returning all users');
});

router.post('/', function(req, res) {
  return res.status(200).send('creating new user');
});

router.delete('/', function(req, res) {
  return res.status(200).send('user deleted');
});

router.patch('/', function(req, res) {
  return res.status(200).send('user updated');
});

router.put('/', function(req, res) {
  return res.status(200).send('user updated');
});

module.exports = router;
