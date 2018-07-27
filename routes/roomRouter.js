const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const roomController = require('../controllers/roomController');
const validateId = require('../middleware/validateObjectId');

router.get('/', [authMiddleware], roomController.getAll);

router.get('/:id', [authMiddleware, validateId], roomController.getRoom);

router.post('/', [authMiddleware], roomController.createRoom);

router.delete('/:id', [authMiddleware, validateId], roomController.deleteRoom);

router.put('/:id', [authMiddleware, validateId], roomController.updateRoom);

module.exports = router;
