const {Admin } = require('../../models');

const logout = async (req, res) => {
  const { _id } = req.user;
  await Admin.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
};

module.exports = logout;
