const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require("crypto-js");
const maskdata = require('maskdata');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    const maskedEmail = maskdata.maskEmail2(req.body.email); //masquage de l'email de l'utilisateur avant stockage ds BDD
    bcrypt.hash(req.body.password, 10) // hashage du mot de passage avec salage avec stockage ds BDD
      .then(hash => {
        const user = new User({
          email: maskedEmail,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.login = (req, res, next) =>{
    const maskedEmail = maskdata.maskEmail2(req.body.email);
    User.findOne({ email: maskedEmail })
        .then(user =>{
            if(!user){
                return res.status(401).json({error: "Utilisateur inexistant"})
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) =>{
                    if (!valid){
                        return res.status(401).json({error: "Mauvais mot de passe"})
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}))
};