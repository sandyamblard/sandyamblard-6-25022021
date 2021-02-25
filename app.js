const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const sauceRoutes = require('./routes/sauce');

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


app.use('/api/sauces', sauceRoutes);

module.exports = app;