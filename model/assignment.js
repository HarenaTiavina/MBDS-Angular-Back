var mongoose = require('mongoose');

var assignmentSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        unique: true
    },
    fichierSujet: {
        type: String,
        required: true,
        unique: true
    },
    fichierReponse: {
        type: String,
        default: ''
    },
    note: {
        type: Number,
        default: null
    },  
    rendu: {
        type: Boolean,
        default: false
    },
    dateRendu: {
        type: Date,
        default: null
    },
    remarque: {
        type: String,
        default: ''
    },
    auteur : {type: mongoose.Types.ObjectId, ref: "Utilisateur"},
    matiere : {type: mongoose.Types.ObjectId, ref: "Matiere"},
});

var assignment = new mongoose.model('Assignment', assignmentSchema);

module.exports = assignment;