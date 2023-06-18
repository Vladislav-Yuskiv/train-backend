const { Train } = require('../../models');
const { NotFound } = require('http-errors');

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTrain = await Train.findByIdAndDelete(id);
    if (!deleteTrain) {
      throw new NotFound();
    }
    res.json({ message: 'Train deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
