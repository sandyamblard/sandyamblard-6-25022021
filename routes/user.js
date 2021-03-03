const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const check = require('../middleware/check');
const checkPassword = require('../middleware/checkPassword');
const nocache = require('nocache');
//const pour middleware protection contre force-brute :
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const mongoose = require('mongoose');
const model = mongoose.model("bruteforce", new mongoose.Schema(BruteForceSchema));
const store = new MongooseStore(model);
const bruteforce = new ExpressBrute(store);

router.post('/signup', nocache(), check, checkPassword, userCtrl.signup);
router.post('/login', nocache(), check, bruteforce.prevent , userCtrl.login);

module.exports = router;
