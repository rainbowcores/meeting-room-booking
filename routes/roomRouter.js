const express = require('express');
const router = express.Router();
const room = require('../models/room.model');
const chalk = require('chalk');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
  room.find({}, (error, rooms) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(rooms);
  });
});

router.get('/:id', function (req, res) {
  room.findById(req.params.id, (error, room) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(room);
  });
});

router.post('/', function (req, res) {
  new room({
    location: req.body.location,
    capacity: req.body.capacity,
    status: req.body.status,
    name: req.body.name,
    equipment: req.body.equipment
  }).save(((error, user) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(user);
  }));
});

router.delete('/:id', function (req, res) {
  room.findByIdAndRemove(req.params.id, (error, room) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(room);
  });
});

router.patch('/:id', function (req, res) {
  return res.status(200).send('room updated');
});

router.put('/:id', function (req, res) {
  return res.status(200).send('room updated');
});

module.exports = router;
