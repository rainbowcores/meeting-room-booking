const equipment = require('../models/equipment.model');

exports.getAll = function (req, res) {
  equipment.find({}, (error, equipments) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipments);
  });
}

exports.getEquipment = function (req, res) {
  equipment.findById(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
}

exports.createEquipment = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can create new equipment
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  new equipment({
    name: req.body.name,
    details: req.body.details
  }).save(((error, equipment) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(200).json(equipment);
  }));
}

exports.updateEquipment = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can update equipment
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  return res.status(200).send('equipment updated');
}

exports.deleteEquipment = function (req, res) {
  if (req.user.role !== 'admin') {
    // only admins can delete equipment
    return res.status(403).send('Unauthorized resource access. User does not have valid credentials to perform that action');
  }
  equipment.findByIdAndRemove(req.params.id, (error, equipment) => {
    if (error) {
      return res.status(500).json(error);
    }
    return res.status(200).json(equipment);
  });
}
