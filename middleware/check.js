//middleware pour validation des entrées des utilisateurs :
// ne doit pas contenir de caractères dangereux, pour éviter unjection SQL ou JS ou CSS :

const pattern =  /[<>$"=#:{}()?%]/

const isInvalid = (string) =>{
    return pattern.test(string);
};

module.exports = (req, res, next) =>{
    if(isInvalid(req.body.email) || isInvalid(req.body.password) || isInvalid(req.body.name) || isInvalid(req.body.manufacturer) || isInvalid(req.body.description) || isInvalid(req.body.mainPepper)){
        throw res.status(404).json({error:'Format de donées incorrectes'});
    }else{ 
        next();
    }
};