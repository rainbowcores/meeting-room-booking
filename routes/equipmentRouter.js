const express = require('express');
const router = express.Router();
const equipment = require('../models/equipment.model');
const chalk = require('chalk');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  equipment.find({}, (error, equipments) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipments);
  });
});

router.get('/:id', function (req, res) {
  equipment.findById(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
});

router.post('/', function (req, res) {
  new equipment({
    name: req.body.name,
    details: req.body.details
  }).save(((error, equipment) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipment);
  }));
});

router.delete('/:id', function (req, res) {
  equipment.findByIdAndRemove(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
});

router.patch('/:id', function (req, res) {
  return res.status(200).send('equipment updated');
});

router.put('/:id', function (req, res) {
  return res.status(200).send('equipment updated');
});

module.exports = router;
