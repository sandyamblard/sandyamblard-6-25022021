const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

//route POST pour création d'une sauce :
router.post('/', auth, sauceCtrl.createSauce);  
 
 //route PUT pour modification d'une sauce:
 router.get('/:id', auth, sauceCtrl.modifySauce);
 
 //route DELETE pour supprimer une sauce :
 router.get('/:id', auth, sauceCtrl.deleteSauce);
 
 //route GET pour récupérer une seule sauce grace à son ID :
 router.get('/:id', auth, sauceCtrl.getOneSauce);
 
 //route GET pour récupérer la liste de toutes les sauces :
 router.get('/', auth, sauceCtrl.getAllSauces);

 module.exports = router;
 