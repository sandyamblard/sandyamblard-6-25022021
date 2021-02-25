const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

//route POST pour création d'une sauce :
router.post('/', sauceCtrl.createSauce);  
 
 //route PUT pour modification d'une sauce:
 router.get('/:id', sauceCtrl.modifySauce);
 
 //route DELETE pour supprimer une sauce :
 router.get('/:id', sauceCtrl.deleteSauce);
 
 //route GET pour récupérer une seule sauce grace à son ID :
 router.get('/:id', sauceCtrl.getOneSauce);
 
 //route GET pour récupérer la liste de toutes les sauces :
 router.get('/', sauceCtrl.getAllSauces);

 module.exports = router;
 