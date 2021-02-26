/*
pr une sauce donnée (son id est dans la requete --> trouver la sauce et sauvegarder ds variable), l'utilisateur (son userId est dans l'ojet userId de req.body) peut aimer ou détester la sauce
si req.body.j'aime == 1 --> sauce.likes +=1, push userId ds sauce.usersLiked
si req.body.j'aime == -1 --> sauce.dislikes +=1, supprime  userId de l'array sauce.usersLiked
si req.body.j'aime == 0 --> vérifier si utilisateur est présent ds array like et le retirer + enlever 1 au number likes de la sauce ou même chose pour dislike
*/