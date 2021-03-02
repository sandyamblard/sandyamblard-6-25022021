const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

const auth = require('../middleware/auth');

const check = require('../middleware/check');

router.post('/signup', check, userCtrl.signup);
router.post('/login', check, userCtrl.login);

module.exports = router;
