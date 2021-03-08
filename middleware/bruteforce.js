//const pour middleware protection contre force-brute :
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const mongoose = require('mongoose');
const model = mongoose.model("bruteforce", new mongoose.Schema(BruteForceSchema));
const store = new MongooseStore(model);
const bruteforce = new ExpressBrute(store);

module.exports = bruteforce;

//à partir de 3 tentatives bloque pour 5h

