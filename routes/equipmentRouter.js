const express = require('express');
const router = express.Router();
const equipment = require('../models/equipment.model');
const validateId = require('../validateObjectId');
const authMiddlware = require('../middleware/auth');
const equipmentController = require('../controllers/equipmentController');

router.get('/', authMiddlware, equipmentController.getAll);

router.get('/:id', authMiddlware, equipmentController.getEquipment);

router.post('/', authMiddlware, equipmentController.createEquipment);

router.delete('/:id', authMiddlware, equipmentController.deleteEquipment);

router.put('/:id', authMiddlware, equipmentController.updateEquipment);

module.exports = router;
