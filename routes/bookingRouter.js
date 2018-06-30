const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.status(200).send('returning all bookings');
});

router.post('/', function(req, res) {
  return res.status(200).send('creating new booking');
});

router.delete('/', function(req, res) {
  return res.status(200).send('booking deleted');
});

router.patch('/', function(req, res) {
  return res.status(200).send('booking updated');
});

router.put('/', function(req, res) {
  return res.status(200).send('booking updated');
});

module.exports = router;
