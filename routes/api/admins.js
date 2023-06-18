const express = require('express');
const { authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/user');
const router = express.Router();

router.post('/signup', ctrl.signup);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);


module.exports = router;
