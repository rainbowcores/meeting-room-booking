const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');
const validateId = require('../middleware/validateObjectId');

router.get('/', [authMiddleware], userController.getAll);

router.get('/:id', [authMiddleware, validateId], userController.getUser);

router.post('/', userController.createUser);

router.delete('/:id', [authMiddleware, validateId], userController.deleteUser);

router.put('/:id', [authMiddleware, validateId], userController.updateUser);

module.exports = router;
