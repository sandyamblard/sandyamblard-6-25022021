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

/* Voir si mieux, peut etre moins vulnérable (module mieux mis à jour ?)
const redis = require('redis');
const {RateLimiterRedis} = require('rate-limiter-flexible');

const redisClient = redis.createClient({
  host: 'redis',
  port: 6379,
  enable_offline_queue: false,
});

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 5, // 5 requests
  duration: 60, // per 60 second by IP
  blockDuration: 60 //bloque pour 1 minute
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send('Too Many Requests');
    });
};

module.exports = rateLimiterMiddleware;*/

