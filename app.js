const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const Sauce = require('./models/Sauce');

//connection à la base de données MongoDB :
mongoose.connect('mongodb+srv://userPekocko:071540@bddpekocko.vve7w.mongodb.net/BDDPekocko?retryWrites=true&w=majority', 
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//configuration du CORS pour requetes exterieures quelque soit type de requetes: (premier middleware)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());  //transforme corps des requetes en objet js utilisable


//route POST pour création d'une sauce :
app.post('/api/sauces', (req, res, next) =>{
   delete req.body._id; //enlève id définit par requete front end, qui sera ensuite re-créé par mongoDB
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).json({message :"sauce enregistrée dans BDD"}))
        .catch(error => res.status(400).json({error}));
});  

//route PUT pour modification d'une sauce:
app.get('/api/sauces/:id', (req, res, next) =>{
    Sauce.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce modifiée'}))
        .catch(error => res.status(400).json({error}));
});

//route DELETE pour supprimer une sauce :
app.get('/api/sauces/:id', (req, res, next) =>{
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message : 'Sauce supprimée'}))
        .catch(error => res.status(400).json({error}));
});

//route GET pour récupérer une seule sauce grace à son ID :
app.get('/api/sauces/:id', (req, res, next) =>{
    Sauce.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
});


//route GET pour récupérer la liste de toutes les sauces :
app.get('/api/sauces', (req, res, next) =>{
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
});




module.exports = app;