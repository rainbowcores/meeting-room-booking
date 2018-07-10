const express = require('express');
const router = express.Router();
const booking = require('../models/booking.model');
const validateId = require('../validateObjectId');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, (req, res) =>  {
  booking.find({})
    .populate('roomId', '-equipment')
    .populate('userId', '-password -role')
    .exec((error, bookings) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(bookings);
    });
});

router.get('/:id', authMiddleware, (req, res) =>  {
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

router.post('/', authMiddleware, (req, res) =>  {
  new booking({
    roomId: req.body.room_id,
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

router.delete('/:id', authMiddleware, (req, res) =>  {
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

router.patch('/:id', authMiddleware, (req, res) =>  {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  return res.status(200).send('booking updated');
});

router.put('/:id', authMiddleware, (req, res) =>  {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid booking id');
  }
  return res.status(200).send('booking updated');
});

module.exports = router;
