const express = require('express');

const router = express.Router();

const likeCtrl = require('../controllers/like');
const auth = require('../middleware/auth');

//route POST pour like ou dislike :
router.post('/:id/like', auth, likeCtrl.likeOrDislike); 

module.exports = router;