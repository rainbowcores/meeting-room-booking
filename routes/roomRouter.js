const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.status(200).send('returning all rooms');
});

router.post('/', function(req, res) {
  return res.status(200).send('creating new room');
});

router.delete('/', function(req, res) {
  return res.status(200).send('room deleted');
});

router.patch('/', function(req, res) {
  return res.status(200).send('room updated');
});

router.put('/', function(req, res) {
  return res.status(200).send('room updated');
});

module.exports = router;
