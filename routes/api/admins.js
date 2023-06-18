const express = require('express');
const { authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/admins');
const router = express.Router();

router.post('/signup', ctrl.signup);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);



module.exports = router;
