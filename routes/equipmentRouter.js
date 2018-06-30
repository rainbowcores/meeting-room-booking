const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.status(200).send('returning all equipment');
});

router.post('/', function(req, res) {
  return res.status(200).send('creating new equipment');
});

router.delete('/', function(req, res) {
  return res.status(200).send('equipment deleted');
});

router.patch('/', function(req, res) {
  return res.status(200).send('equipment updated');
});

router.put('/', function(req, res) {
  return res.status(200).send('equipment updated');
});

module.exports = router;
