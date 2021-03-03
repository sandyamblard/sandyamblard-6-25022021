const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('cookie-session');

const app = express();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const likeRoutes = require('./routes/like');

//connection à la base de données MongoDB :
mongoose.connect('mongodb+srv://userPekocko:071540@bddpekocko.vve7w.mongodb.net/BDDPekocko?retryWrites=true&w=majority', 
    { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//configuration du CORS pour autoriser requetes exterieures : 
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //autorise n'importe quelle origine
    //définition des en-tetes qui seront utilisées
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');//définit les méthodes autorisées
    next();
  });

 //paramètre les cookies en http-only (sécurise la connection)
 app.use(session({
   secret:"s4Fe1y",
   cookie:{
     secure: true,
     httpOnly: true,
     domain: 'http://localhost:3000',
   }
 })); 

app.use(bodyParser.json());  //transforme corps des requetes en objet js utilisable

//on fait en sorte de pouvoir accéder au dossier images en rendant le dossier images statique :
app.use('/images', express.static(path.join(__dirname, 'images')));

//utilisation des différentes routes définies par le router, avec uri de l'api
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/sauces', likeRoutes);

module.exports = app;

