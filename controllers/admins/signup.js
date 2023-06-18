const { Admin, joiRegisterSchema } = require('../../models/admin');
const { BadRequest, Conflict } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');
const { SECRET_KEY } = process.env;

const signup = async (req, res, next) => {
  try {
    const { error } = joiRegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { name, email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin) {
      throw new Conflict('Email in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const id = nanoid(16);
    const payload = {
      id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    const newUser = await Admin.create({
      name,
      email,
      password: hashPassword,
      token,
    });
    res.status(201).json({
      token: newUser.token,
      admin: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
