const { Admin, joiLoginSchema } = require('../../models/admin');
const { BadRequest, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Unauthorized('Email does not exist or Password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, admin.password);

    if (!passwordCompare) {
      throw new Unauthorized('Email does not exist or Password is wrong');
    }

    const { _id, name } = admin;
    const payload = {
      id: _id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    await Admin.findByIdAndUpdate(_id, { token });
    res.json({
      token,
      admin: { email, name },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
