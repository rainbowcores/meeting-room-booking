const booking = require('../models/booking.model');

exports.getAll = function (req, res) {
  booking.find({})
    .populate('roomId', '-equipment')
    .populate('userId', '-password -role')
    .exec((error, bookings) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(bookings);
    });
}

exports.getBooking = function (req, res) {
  booking.findById(req.params.id, (error, booking) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(booking);
  });
}

exports.createBooking = function (req, res) {
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
}

exports.updateBooking = async function (req, res) {
  try {
    const response = await validateBooking(req.params.id, req);
  } catch (error) {
    res.status(500).send('There was an error processing your request');
  }
  if (response) {
    return res.status(response.status).send(response.message);
  }
  if (req.user.role !== 'admin') {
    // only admins can update booking details
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  return res.status(200).send('booking updated');
}

exports.deleteBooking = async function (req, res) {
  const response = await validateBooking(req.params.id, req);
  if (response) {
    return res.status(response.status).send(response.message);
  }
  booking.findByIdAndRemove(req.params.id, (error, booking) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(booking);
  });
}

async function validateBooking(bookingId, req) {
  const requestedBooking = await booking.findById(bookingId).exec();
  if (!requestedBooking) {
    return {
      status: 500,
      message: "Booking not found"
    }
  }
  if (requestedBooking.userId !== req.user._id) {
    // user attempting to delete another users booking
    return {
      status: 403,
      message: "Unauthorized access. Cannot delete this booking"
    }
  }
  return null;
}
