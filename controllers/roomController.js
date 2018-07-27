const room = require('../models/room.model');
const equipment = require('../models/equipment.model');

exports.getAll = function (req, res) {
  room.find({})
    .populate('equipment')
    .exec(((error, rooms) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(rooms);
    }));
}

exports.getRoom = function (req, res) {
  room.findById(req.params.id, (error, room) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(room);
  });
}

exports.createRoom = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can create new rooms
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
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
}

exports.deleteRoom = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can delete rooms
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  room.findByIdAndRemove(req.params.id, (error, room) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(room);
  });
}

exports.updateRoom = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can update room definitions
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  return res.status(200).send('room updated');
}
