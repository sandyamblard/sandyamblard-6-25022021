//création d'un schema de password fort pour éviter attaques par foce brute

const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)
    .has().uppercase()
    .has().lowercase()
    .has().digits();

    module.exports = passwordSchema;

