const express = require('express');
const router = express.Router();
const equipment = require('../models/equipment.model');
const authMiddleware = require('../middleware/auth');
const roomController = require('../controllers/roomController');

router.get('/', authMiddleware, roomController.getAll);

router.get('/:id', authMiddleware, roomController.getRoom);

router.post('/', authMiddleware, roomController.createRoom);

router.delete('/:id', authMiddleware, roomController.deleteRoom);

router.put('/:id', authMiddleware, roomController.updateRoom);

module.exports = router;
