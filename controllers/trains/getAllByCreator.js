const { Train } = require('../../models');

const getAllByCreator = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const { _id } = req.admin;
    const skip = (page - 1) * limit;
    const trains = await Train.find({ creator: _id }, '', {
      skip,
      limit: +limit,
    });
    res.json(trains);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllByCreator;
