const Sauce = require('../models/Sauce'); //importation des modèles Sauce
const fs = require('fs'); //pour accéder aux systèmes de gestion de fichiers de node


//middleware pour créer une nouvelle sauce (pr associer à route POST)
exports.createSauce = (req, res, next) =>{
    const sauceObject = JSON.parse(req.body.sauce); //objet javascript obtenu a partir de la requete front end
    delete sauceObject._id; //enlève id définit par requete front end, qui sera ensuite re-créé par mongoDB
     const sauce = new Sauce({
         ...sauceObject,
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     });
     sauce.save()
         .then(() => res.status(201).json({message :"sauce enregistrée dans BDD"}))
         .catch(error => res.status(400).json({error}));
 };


 /*exports.modifySauce = (req, res, next) =>{
     //verifie si nouvel image ou pas
     const sauceObject = req.file ?
     { //si nouvelle image :
         ...JSON.parse(req.body.sauce),
         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //on rajoute une nouvelle image
     } : { ...req.body};//si pas de nouvelle image
    Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce modifiée'}))
        .catch(error => res.status(400).json({error}));
};*/

//middleware pour modifier une sauce existante (pr associer à route PUT)
exports.modifySauce = (req, res, next) =>{
    if(req.file){//verifie si nouvelle image dans la requete
        const sauceObject = {...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
        Sauce.findOne({ _id: req.params.id})
            .then(sauce =>{
                const oldImageFilename = sauce.imageUrl.split('/images')[1]; //on récupère l'ancien nom de l'image
                fs.unlink(`images/${oldImageFilename}`, () =>{console.log('photo retirée')}); //on retire l'ancienne image du dossier du serveur
                //on update la sauce ds BDD avec nouvelle image et les autres infos modifiées 
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Sauce modifiée'}))
                    .catch(error => res.status(400).json({error}));
                })
            .catch(error => res.status(400).json({error}))
        
    }else{ //si pas de nouvelle image : on reste avec requete telle quelle et on update la BDD
        Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Sauce modifiée'}))
            .catch(error => res.status(400).json({error}));
    }
};


//middleware pour supprimer une sauce (pr associer à route DELETE)
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


//middleware pour obtenir les infos d'une seule sauce (pr associer à route GET)
exports.getOneSauce = (req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};


//middleware pour obtenir les infos de toutes les sauces (pr associer à route GET)
exports.getAllSauces = (req, res, next) =>{
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

