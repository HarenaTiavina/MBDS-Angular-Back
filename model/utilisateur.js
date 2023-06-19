var mongoose = require('mongoose');

var utilisateurSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        default: ''
    },
    prenom: {
        type: String,
        default: ''
    },
    photo: {
        type: String,
        default: ''
    },
    mdp: String,
    profil : {type: mongoose.Types.ObjectId, ref: "Profil"}
});

var utilisateur = new mongoose.model('Utilisateur', utilisateurSchema);

module.exports = utilisateur;