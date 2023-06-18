const { NotFound } = require('http-errors');
const {
  Train,
  schemaValidateTrain,
} = require('../../models/train');

const updateById = async (req, res, next) => {
  try {
    const { error } = schemaValidateTrain.validate(req.body);
    if (error) {
      throw res.status(400).json({ message: 'missing fields' });
    }
    const { adminId,  trainId } = req.params;
  
    const updateTrain = await Train.findByIdAndUpdate(
      trainId,
      {
        ...req.body,
        editor: adminId,
        updateDate: new Date()
      },
      { new: true },
    );

    if (!updateTrain) {
      throw new NotFound();
    }
    res.json(updateTrain);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
