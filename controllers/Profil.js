const ProfilModel = require('../model/profil')

// Create and Save a new profile
exports.create = async (req, res) => {
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const profil = new ProfilModel({
        nom: req.body.nom      
    });
    
    await profil.save().then(data => {
        res.send({
            message:"Profil created successfully!!",
            profil:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating profil"
        });
    });
};