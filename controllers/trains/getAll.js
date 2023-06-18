const { Train } = require('../../models');

const getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const skip = (page - 1) * limit;
    const trains = await Train.find({ }, '', {
      skip,
      limit: +limit,
    });
    res.json(trains);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
