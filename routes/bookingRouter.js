const express = require('express');
const router = express.Router();
const booking = require('../models/booking.model');
const chalk = require('chalk');
const mongoose = require('mongoose');
const validateId = require('../validateObjectId');

router.get('/', function (req, res) {
  booking.find({}, (error, bookings) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(bookings);
  });
});

router.get('/:id', function (req, res) {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  booking.findById(req.params.id, (error, booking) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(booking);
  });
});

router.post('/', function (req, res) {
  new booking({
    room_id: req.body.room_id,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime,
    details: req.body.details,
    userId: req.body.userId
  }).save(((error, booking) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(booking);
  }));
});

router.delete('/:id', function (req, res) {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  booking.findByIdAndRemove(req.params.id, (error, booking) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(booking);
  });
});

router.patch('/:id', function (req, res) {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  return res.status(200).send('booking updated');
});

router.put('/:id', function (req, res) {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  return res.status(200).send('booking updated');
});

module.exports = router;
