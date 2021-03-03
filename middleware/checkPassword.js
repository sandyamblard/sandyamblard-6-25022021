const passwordSchema = require('../models/Password');

module.exports = (req, res, next) =>{
    if(!passwordSchema.validate(req.body.password)){
        return res.status(400).json({ error : 'Mot de pass pas assez fort'});
    } else {
        next();
    }
}