const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const check = require('../middleware/check');
const checkPassword = require('../middleware/checkPassword');
const nocache = require('nocache');
const bruteforce = require('../middleware/bruteforce');

router.post('/signup', nocache(), check, checkPassword, userCtrl.signup);
router.post('/login', nocache(), check, bruteforce.prevent , userCtrl.login);

module.exports = router;
