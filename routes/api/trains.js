const express = require('express');

const ctrl = require('../../controllers/trains');

const { authenticate } = require('../../middlewares');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/', authenticate ,ctrl.getAllByCreator);

router.post('/create', authenticate, ctrl.create);

router.put('/update/:id', authenticate, ctrl.updateById);

router.delete('/delete/:id', authenticate, ctrl.deleteById);




module.exports = router;
