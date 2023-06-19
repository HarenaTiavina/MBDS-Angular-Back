var mongoose = require('mongoose');

var matiereSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String,
        default: ''
    },
    etat: {
        type: Boolean,
        default: false
    },
    prof : {type: mongoose.Types.ObjectId, ref: "Utilisateur"}
});

var matiere = new mongoose.model('Matiere', matiereSchema);

module.exports = matiere;