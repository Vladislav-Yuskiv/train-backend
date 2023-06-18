const {
  Train,
  schemaValidateTrain,
} = require('../../models/train');

const create = async (req, res, next) => {
  try {
    const { error } = schemaValidateTrain.validate(req.body);
    if (error) {
      throw res.status(400).json(error.message);
    }
    const { _id } = req.admin;
  
    const newTrain = await Train.create({
      ...req.body,
      creator: _id,
    });

    res.status(201).json(newTrain);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
