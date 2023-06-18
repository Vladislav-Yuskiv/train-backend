const current = async (req, res) => {
  const { name, email, balance } = req.user;
  res.json({
    user: {
      name,
      email,
      balance,
    },
  });
};

module.exports = current;
