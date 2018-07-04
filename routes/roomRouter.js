const express = require('express');
const router = express.Router();
const room = require('../models/room.model');
const equipment = require('../models/equipment.model');

router.get('/', function (req, res) {
  room.find({}, (error, rooms) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(rooms);
  });
});

router.get('/:id', function (req, res) {
  room.findById(req.params.id, (error, room) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(room);
  });
});

router.post('/', function (req, res) {
  let equipmentArray = req.body.equipment;
  // we need to make sure all the equipment ids passed by the user are valid  
  equipmentArray.map((item, index) => {
    equipment.findById(item, (error, item) => {
      if (error) { 
        equipmentArray.pop(index);
       }
      if (item === null) {
        equipmentArray.pop(index);
      }
    });
  });
  new room({
    location: req.body.location,
    capacity: req.body.capacity,
    status: req.body.status,
    name: req.body.name,
    equipment: equipmentArray
  }).save(((error, user) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(user);
  }));
});

router.delete('/:id', function (req, res) {
  room.findByIdAndRemove(req.params.id, (error, room) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(room);
  });
});

router.patch('/:id', function (req, res) {
  return res.status(200).send('room updated');
});

router.put('/:id', function (req, res) {
  return res.status(200).send('room updated');
});

module.exports = router;