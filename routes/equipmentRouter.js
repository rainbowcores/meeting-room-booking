const express = require('express');
const router = express.Router();
const equipment = require('../models/equipment.model');
const validateId = require('../validateObjectId');
const authMiddlware = require('../middleware/auth');

router.get('/', authMiddlware, (req, res) => {
  equipment.find({}, (error, equipments) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipments);
  });
});

router.get('/:id', authMiddlware, (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid equipment id');
  }
  equipment.findById(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
});

router.post('/', authMiddlware, (req, res) => {
  new equipment({
    name: req.body.name,
    details: req.body.details
  }).save(((error, equipment) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipment);
  }));
});

router.delete('/:id', authMiddlware, (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid equipment id');
  }
  equipment.findByIdAndRemove(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
});

router.patch('/:id', authMiddlware, (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid equipment id');
  }
  return res.status(200).send('equipment updated');
});

router.put('/:id', authMiddlware, (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json('Invalid equipment id');
  }
  return res.status(200).send('equipment updated');
});

module.exports = router;
