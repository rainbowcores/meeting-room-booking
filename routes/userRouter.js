const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/', authMiddleware, userController.getAll);

router.get('/:id', authMiddleware, userController.getUser);

router.post('/', userController.createUser);

router.delete('/:id', authMiddleware, userController.deleteUser);

router.put('/:id', authMiddleware, userController.updateUser);

module.exports = router;
