const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

router.get('/', authMiddleware, bookingController.getAll);

router.get('/:id', authMiddleware, bookingController.getBooking);

router.post('/', authMiddleware, bookingController.createBooking);

router.delete('/:id', authMiddleware, bookingController.deleteBooking);

router.put('/:id', authMiddleware, bookingController.updateBooking);

module.exports = router;
