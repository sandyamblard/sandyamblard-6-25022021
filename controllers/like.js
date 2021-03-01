const Sauce = require("../models/Sauce")

exports.likeOrDislike = (req, res, next) =>{
    if(req.body.like === 1){ //si user like : rajoute 1 au nombre de like de la sauce et rajoute Id de user dans array des usersLiked de la sauce
        Sauce.findOne({_id:req.params.id})//trouve la sauce concernée par la requête
            .then(sauce =>{
                if(!sauce.usersLiked.includes(req.body.userId)){ //on vérifie que l'utilisateur n'aime aps déjà la sauce
                    /**/if(sauce.usersDisliked.includes(req.body.userId)){ //on vérifie qu el'utilisateur ne déteste pas la sauce auqel cas on retire son Id du tableau disliked
                        const index = sauce.usersDisliked.indexOf(req.body.userId);
                        sauce.usersDisliked.splice(index, 1);//on retire l'user du array dislike
                        const usersDislikedUpdated=  sauce.usersDisliked; 
                        sauce.dislikes -= 1; //on enlève 1 au nombre de dislike
                        const dislikesUpadted = sauce.dislikes;
                        const id = sauce._id;
            
                        Sauce.updateOne({_id: id}, {dislikes: dislikesUpadted, usersDisliked: usersDislikedUpdated}) //modif base de données avant de continuer avec code commun
                        .then(() => res.status(200).json({ message: 'Dislike retiré !'}))
                        .catch(error => res.status(400).json({ error }));/**/
//peut etre pas besoin car a priori on ne peut pas cliquer sur j'aime si on déteste... (on doit d'abord recliquer sur j'aime pas pour annuler le j'aime pas)
                    }//dans tous les cas (ou après retrait du je déteste) :
                    sauce.likes += 1;
                    sauce.usersLiked.push(req.body.userId);
                    const id = sauce._id;
                    const likesUpadted = sauce.likes;
                    const userslikesUpadted = sauce.usersLiked;
                    Sauce.updateOne({_id: id}, {likes: likesUpadted, usersLiked: userslikesUpadted })
                        .then(() => res.status(200).json({ message: 'Like ajouté !'}))
                        .catch(error => res.status(400).json({ error }));
                    }
                })  
            .catch(error => res.status(500).json({ error }))      
    }else if(req.body.like === -1){
        Sauce.findOne({_id:req.params.id})//trouve la sauce concernée par la requête
            .then(sauce =>{
                if(!sauce.usersDisliked.includes(req.body.userId)){
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(req.body.userId);
                    const id = sauce._id;
                    const dislikesUpadted = sauce.dislikes;
                    const usersdislikesUpadted = sauce.usersDisliked;
                    Sauce.updateOne({_id: id}, {dislikes: dislikesUpadted, usersDisliked: usersdislikesUpadted })
                        .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
                        .catch(error => res.status(400).json({ error }));
                    }
                })        
            .catch(error => res.status(500).json({ error }))
    }else if(req.body.like ===0){//pour changer d'avis, qd utilisateur reclique sur option déjà enregistrée (j'aime ou déteste suivant le cas)
                Sauce.findOne({_id:req.params.id})
                    .then(sauce =>{
                        if(sauce.usersDisliked.includes(req.body.userId)){ //on vérifie si l'utilisateur  déteste pas la sauce auqel cas on retire son Id du tableau disliked
                        const index = sauce.usersDisliked.indexOf(req.body.userId);
                        sauce.usersDisliked.splice(index, 1);//on retire l'user du array dislike
                        const usersDislikedUpdated=  sauce.usersDisliked; 
                        sauce.dislikes -= 1; //on enlève 1 au nombre de dislike
                        const dislikesUpadted = sauce.dislikes;
                        const id = sauce._id;
            
                        Sauce.updateOne({_id: id}, {dislikes: dislikesUpadted, usersDisliked: usersDislikedUpdated}) //modif base de données avant de continuer avec code commun
                        .then(() => res.status(200).json({ message: 'Dislike retiré !'}))
                        .catch(error => res.status(400).json({ error }));
                        }else if(sauce.usersLiked.includes(req.body.userId)){ //on vérifie si l'utilisateur aime la sauce auqel cas on retire son Id du tableau disliked
                        const index = sauce.usersLiked.indexOf(req.body.userId);
                        sauce.usersLiked.splice(index, 1);//on retire l'user du array dislike
                        const usersLikedUpdated=  sauce.usersLiked; 
                        sauce.Likes -= 1; //on enlève 1 au nombre de dislike
                        const likesUpadted = sauce.likes;
                        const id = sauce._id;
            
                        Sauce.updateOne({_id: id}, {likes: likesUpadted, usersLiked: usersLikedUpdated}) //modif base de données avant de continuer avec code commun
                        .then(() => res.status(200).json({ message: 'Like retiré !'}))
                        .catch(error => res.status(400).json({ error }));

                        }
                    }).catch(error => res.status(500).json({ error }))
                
    }
 }
       

/*
pr une sauce donnée (son id est dans la requete --> trouver la sauce et sauvegarder ds variable), l'utilisateur (son userId est dans l'ojet userId de req.body) peut aimer ou détester la sauce
si req.body.j'aime == 1 --> sauce.likes +=1, push userId ds sauce.usersLiked
si req.body.j'aime == -1 --> sauce.dislikes +=1, supprime  userId de l'array sauce.usersLiked
si req.body.j'aime == 0 --> vérifier si utilisateur est présent ds array like et le retirer + enlever 1 au number likes de la sauce ou même chose pour dislike
*/