//stockage des middleware des routing
const Sauce = require('../models/Sauce');
const fs = require('fs'); //pour accéder aux systèmes d egestion de ficheirs de node

exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce); //objet javascript obetnu a partir de la requete front end
    delete sauceObject._id; //enlève id définit par requete front end, qui sera ensuite re-créé par mongoDB
     const sauce = new Sauce({
         ...sauceObject,
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     });
     sauce.save()
         .then(() => res.status(201).json({message :"sauce enregistrée dans BDD"}))
         .catch(error => res.status(400).json({error}));
 };


 exports.modifySauce = (req, res, next) =>{
     //verifie si nouvel image ou pas
     const sauceObject = req.file ?
     { //si nouvelle image :
         ...JSON.parse(req.body.sauce),
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //!!! rajouter suppression de l'ancienne image !
     } : { ...req.body};//si pas de nouvelle image
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce modifiée'}))
        .catch(error => res.status(400).json({error}));
};


exports.deleteSauce = (req, res, next) =>{
    Sauce.findOne({ _id: req.params.id}) //on trouve la sauce ds la bdd
        .then(sauce =>{
            const filename = sauce.imageUrl.split('/images')[1]; //on récupère l'image et on la suprime des fichiers du server
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id}) // puis on supprime la sauce de la BDD
                    .then(() => res.status(200).json({message : 'Sauce supprimée'}))
                    .catch(error => res.status(400).json({error}));
            });
        })
        .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

exports.getAllSauces = (req, res, next) =>{
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

