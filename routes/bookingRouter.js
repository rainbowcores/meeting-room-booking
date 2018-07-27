const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');
const validateId = require('../middleware/validateObjectId');

router.get('/', [authMiddleware], bookingController.getAll);

router.get('/:id', [authMiddleware, validateId], bookingController.getBooking);

router.post('/', [authMiddleware], bookingController.createBooking);

router.delete('/:id', [authMiddleware, validateId], bookingController.deleteBooking);

router.put('/:id', [authMiddleware, validateId], bookingController.updateBooking);

module.exports = router;
