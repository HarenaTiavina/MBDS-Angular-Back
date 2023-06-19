var mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
    nom: String
});

var profil = mongoose.model("Profil", profilSchema);

module.exports = profil;