const express = require('express');
const router = express.Router();
const authMiddlware = require('../middleware/auth');
const equipmentController = require('../controllers/equipmentController');
const validateId = require('../middleware/validateObjectId');

router.get('/', [authMiddlware], equipmentController.getAll);

router.get('/:id', [authMiddlware, validateId], equipmentController.getEquipment);

router.post('/', [authMiddlware], equipmentController.createEquipment);

router.delete('/:id', [authMiddlware, validateId], equipmentController.deleteEquipment);

router.put('/:id', [authMiddlware, validateId], equipmentController.updateEquipment);

module.exports = router;
